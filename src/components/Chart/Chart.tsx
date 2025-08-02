import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { useRef, useEffect } from "react";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler // ✅ needed for area chart fill
);

interface ChartComponentProps {
  type: "bar" | "line" | "area" | "pie" | "doughnut";
  data: ChartData<any>;
  options?: ChartOptions<any>;
  className?: string;
  legendPosition?: "top" | "bottom" | "left" | "right";
  useGradient?: boolean;
}

export default function ChartComponent({
  type,
  data,
  options,
  className,
  legendPosition = "bottom",
  useGradient = false,
}: ChartComponentProps) {
  const chartRef = useRef<any>(null);

  const DEFAULT_COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  // ✅ Deep clone the data to avoid mutating props
  const safeData = JSON.parse(JSON.stringify(data));

  // ✅ Assign colors if not set
  safeData.datasets.forEach((dataset: any, idx: number) => {
    if (!dataset.backgroundColor) {
      if (["pie", "doughnut"].includes(type)) {
        dataset.backgroundColor = (safeData.labels || []).map(
          (_: string, i: number) => DEFAULT_COLORS[i % DEFAULT_COLORS.length]
        );
      } else {
        dataset.backgroundColor = DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
      }
    }

    // ✅ Area chart defaults
    if (type === "area") {
      dataset.fill = true;
      dataset.tension = 0.4;
      dataset.borderColor = dataset.borderColor || dataset.backgroundColor;
    }

    // ✅ Line chart defaults
    if (type === "line") {
      dataset.fill = false;
      dataset.tension = 0.4;
      dataset.borderColor = dataset.borderColor || dataset.backgroundColor;
      dataset.backgroundColor = "transparent";
    }
  });

  // ✅ Apply gradients after chart is ready
  useEffect(() => {
    if (!useGradient || !chartRef.current) return;

    const chart = chartRef.current;

    const applyGradients = () => {
      if (!chart.chartArea) return; // wait until chart is fully rendered

      const ctx = chart.ctx as CanvasRenderingContext2D;
      const { top, bottom, left, right } = chart.chartArea;
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;
      const maxRadius = Math.min(chart.width, chart.height) / 2;

      safeData.datasets.forEach((dataset: any) => {
        // ✅ PIE & DOUGHNUT: radial gradient per slice
        if (["pie", "doughnut"].includes(type)) {
          dataset.backgroundColor = (safeData.labels || []).map(
            (_: string, i: number) => {
              const baseColor = DEFAULT_COLORS[i % DEFAULT_COLORS.length];
              const gradient = ctx.createRadialGradient(
                centerX,
                centerY,
                0,
                centerX,
                centerY,
                maxRadius
              );
              gradient.addColorStop(0, "rgba(255,255,255,0.2)");
              gradient.addColorStop(1, baseColor);
              return gradient;
            }
          );
        }

        // ✅ BAR: vertical gradient
        if (type === "bar" && typeof dataset.backgroundColor === "string") {
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0, dataset.backgroundColor);
          gradient.addColorStop(1, "rgba(255,255,255,0.2)");
          dataset.backgroundColor = gradient;
        }

        // ✅ AREA: smooth fill
        if (type === "area" && typeof dataset.borderColor === "string") {
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0, dataset.borderColor);
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          dataset.backgroundColor = gradient;
        }
      });

      // ✅ Force redraw after gradients are applied
      chart.update();
    };

    // 🔥 Call once right away if chart is ready
    if (chart.chartArea) {
      applyGradients();
    }

    // 🔥 Also listen for first draw
    chart.options.animation = {
      onComplete: () => {
        applyGradients();
      },
    };
  }, [useGradient, type, data]);

  // ✅ Merge options
  const chartOptions: ChartOptions<any> = {
    responsive: true,
    ...options,
    plugins: {
      ...options?.plugins,
      legend: {
        ...options?.plugins?.legend,
        position: legendPosition,
        labels: {
          ...options?.plugins?.legend?.labels,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 10,
          font: { size: 14, weight: "bold" },
        },
      },
    },
  };

  // ✅ Pick correct chart component
  const ChartTag =
    type === "line" || type === "area"
      ? Line
      : type === "pie"
      ? Pie
      : type === "doughnut"
      ? Doughnut
      : Bar;

  return (
    <ChartTag
      ref={chartRef}
      data={safeData}
      options={chartOptions}
      className={className}
    />
  );
}
