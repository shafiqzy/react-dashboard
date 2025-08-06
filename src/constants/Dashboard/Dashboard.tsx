import { FaChartBar, FaUsers, FaShoppingCart } from "react-icons/fa";

// ✅ KPI CARDS (with translation keys)
export const DASHBOARD_CARDS = [
  {
    id: "sales",
    icon: <FaChartBar className="text-blue-400" />,
    titleKey: "label:sales_performance",
    stat: "$12,430",
    descKey: "label:track_sales_performance",
  },
  {
    id: "users",
    icon: <FaUsers className="text-green-400" />,
    titleKey: "label:new_users",
    stat: "1,280",
    descKey: "label:user_acquisition",
  },
  {
    id: "orders",
    icon: <FaShoppingCart className="text-orange-400" />,
    titleKey: "label:total_orders",
    stat: "845",
    descKey: "label:orders_overview",
  },
  {
    id: "sales2",
    icon: <FaChartBar className="text-blue-400" />,
    titleKey: "label:sales_performance",
    stat: "$12,430",
    descKey: "label:track_sales_performance",
  },
];

// ✅ CHART DATA
export const SALES_OVERVIEW_DATA = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Sales Overview 2024",
      data: [30, 50, 40, 60],
      backgroundColor: "#FF9E00",
      borderColor: "#FF9E00",
      fill: false,
    },
    {
      label: "Sales Overview 2025",
      data: [20, 40, 30, 50],
      backgroundColor: "#36A2EB",
      borderColor: "#36A2EB",
      fill: false,
    },
  ],
};

// ✅ CHART OPTIONS
export const SALES_OVERVIEW_OPTIONS = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Sales Overview",
    },
  },
  animation: { duration: 600 },
};

// ✅ USER TABLE
export const USER_TABLE = [
  { name: "John Doe", email: "john@example.com", role: "Admin" },
  { name: "Jane Smith", email: "jane@example.com", role: "User" },
];

// ✅ RECENT ACTIVITY
export const RECENT_ACTIVITY = [
  "label:user_signed_up",
  "label:new_order",
  "label:payment_received",
];

// ✅ TOP PRODUCTS
export const TOP_PRODUCTS = [
  "label:product_a",
  "label:product_b",
  "label:product_c",
];

// 🔽 🔽 🔽 ADD FILTER FUNCTION HERE 🔽 🔽 🔽

// ✅ Filter function to dynamically return dashboard data
export function getDashboardData(filter: "this_month" | "last_month" | "2024") {
  switch (filter) {
    case "last_month":
      return {
        cards: DASHBOARD_CARDS.map((card) => ({
          ...card,
          stat:
            card.id === "sales"
              ? "$9,800"
              : card.id === "users"
              ? "900"
              : card.id === "orders"
              ? "620"
              : card.stat,
        })),
        chartData: {
          ...SALES_OVERVIEW_DATA,
          datasets: SALES_OVERVIEW_DATA.datasets.map((ds) => ({
            ...ds,
            data: ds.data.map((val) => val - 5), // simulate dip last month
          })),
        },
        recentActivity: ["label:user_signed_up", "label:new_order"],
        topProducts: ["label:product_b", "label:product_c", "label:product_d"],
      };

    case "2024":
      return {
        cards: DASHBOARD_CARDS.map((card) => ({
          ...card,
          stat:
            card.id === "sales"
              ? "$150,000"
              : card.id === "users"
              ? "12,800"
              : card.id === "orders"
              ? "9,845"
              : card.stat,
        })),
        chartData: SALES_OVERVIEW_DATA,
        recentActivity: RECENT_ACTIVITY,
        topProducts: TOP_PRODUCTS,
      };

    case "this_month":
    default:
      return {
        cards: DASHBOARD_CARDS,
        chartData: SALES_OVERVIEW_DATA,
        recentActivity: RECENT_ACTIVITY,
        topProducts: TOP_PRODUCTS,
      };
  }
}
