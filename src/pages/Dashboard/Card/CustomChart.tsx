import { useState } from "react";
import {
  FaChartBar,
  FaChartLine,
  FaMountain,
  FaRegCircle,
  FaChartPie,
  FaChevronDown,
} from "react-icons/fa";
import ChartComponent from "src/components/Chart/Chart";
import Dropdown from "src/components/Dropdown/Dropdown";

interface CustomChartCardProps {
  title: string;
  type?: "bar" | "line" | "area" | "doughnut" | "pie";
  color?: string;
  multipleDatasets?: boolean;
  useGradient?: boolean;
}

export default function CustomChartCard({
  title,
  type = "bar",
  color = "#FF9E00",
  multipleDatasets = false,
  useGradient = false,
}: CustomChartCardProps) {
  const [chartType, setChartType] = useState(type);

  const chartData = {
    labels: ["January", "February", "March", "April"],
    datasets: multipleDatasets
      ? [
          {
            label: `${title} 2024`,
            data: [30, 50, 40, 60],
            backgroundColor: color,
            borderColor: color,
          },
          {
            label: `${title} 2025`,
            data: [20, 40, 30, 50],
            backgroundColor: "#36A2EB",
            borderColor: "#36A2EB",
          },
        ]
      : [
          {
            label: title,
            data: [30, 50, 40, 60],
            backgroundColor: color,
            borderColor: color,
          },
        ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
    animation: { duration: 600 },
  };

  // ✅ Chart types with react-icons
  const CHART_TYPES = [
    { label: "Area Chart", value: "area", icon: <FaMountain /> },
    { label: "Bar Chart", value: "bar", icon: <FaChartBar /> },
    { label: "Line Chart", value: "line", icon: <FaChartLine /> },
    { label: "Doughnut Chart", value: "doughnut", icon: <FaRegCircle /> },
    { label: "Pie Chart", value: "pie", icon: <FaChartPie /> },
  ] as const;

  const activeIndex = CHART_TYPES.findIndex((i) => i.value === chartType);
  const activeItem = CHART_TYPES[activeIndex];

  return (
    <div className="ds-card bg-base-100 shadow-md p-4 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        {/* ✅ Use Dropdown with startIcon */}
        <Dropdown
          buttonContent={
            <div className="flex items-center space-x-1">
              <span className="text-lg">{activeItem.icon}</span>
              <span>{activeItem.label}</span>
              <FaChevronDown className="ml-1 text-sm" aria-hidden="true" />
            </div>
          }
          defaultActiveIndex={activeIndex}
          items={CHART_TYPES.map((item) => ({
            label: item.label, // plain text label now
            startIcon: item.icon, // ✅ icon passed here
            onClick: () => setChartType(item.value),
          }))}
        />
      </div>

      <ChartComponent
        type={chartType}
        data={chartData}
        options={chartOptions}
        legendPosition="bottom"
        useGradient={useGradient}
      />
    </div>
  );
}
