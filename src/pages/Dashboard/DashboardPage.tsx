import { useTranslation } from "react-i18next";
import {
  FaChartBar,
  FaUsers,
  FaShoppingCart,
  FaEllipsisV,
} from "react-icons/fa";
import Card from "src/components/Card/Card";
import CustomChartCard from "./Card/CustomChart";
import TableCard from "./Table/Table";

export default function DashboardPage() {
  const { t } = useTranslation(); // ✅ Hook for translations

  return (
    <div>
      {/* ✅ Title + Button */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{t("label:dashboard")}</h1>
        <div className="flex items-center space-x-2">
          <button className="ds-btn ds-btn-primary">
            {t("label:add_widget")}
          </button>
          <FaEllipsisV className="text-gray-500" />
        </div>
      </div>

      {/* ✅ First row - Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card
          title={t("label:sales_performance")}
          icon={<FaChartBar className="text-blue-500" />}
          stat="$12,430"
        >
          {t("label:track_sales_performance")}
        </Card>

        <Card
          title={t("label:new_users")}
          icon={<FaUsers className="text-green-500" />}
          stat="1,280"
        >
          {t("label:user_acquisition")}
        </Card>

        <Card
          title={t("label:total_orders")}
          icon={<FaShoppingCart className="text-orange-500" />}
          stat="845"
        >
          {t("label:orders_overview")}
        </Card>

        <Card
          title={t("label:sales_performance")}
          icon={<FaChartBar className="text-blue-500" />}
          stat="$12,430"
        >
          {t("label:track_sales_performance")}
        </Card>
      </div>

      {/* ✅ Second row - Chart + Table */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card title={t("label:sales_overview")}>
          <CustomChartCard
            title={t("label:sales_overview")}
            type="area"
            multipleDatasets={true}
            useGradient={true}
          />
        </Card>

        <Card title={t("label:sales_overview")}>
          <TableCard />
        </Card>
      </div>

      {/* ✅ Third row - Extra section */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card title={t("label:recent_activity")}>
          <ul className="list-disc pl-5">
            <li>{t("label:user_signed_up")}</li>
            <li>{t("label:new_order")}</li>
            <li>{t("label:payment_received")}</li>
          </ul>
        </Card>

        <Card title={t("label:top_products")}>
          <ul className="list-decimal pl-5">
            <li>{t("label:product_a")}</li>
            <li>{t("label:product_b")}</li>
            <li>{t("label:product_c")}</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
