import { useTranslation } from "react-i18next";
import { FaChartBar, FaUsers, FaShoppingCart } from "react-icons/fa";
import Card from "src/components/Card/Card";
import CustomChartCard from "./Card/CustomChart";

export default function DashboardPage() {
  const { t } = useTranslation(); // ✅ Hook for translations

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{t("label:dashboard")}</h1>

      <div className="grid grid-cols-3 gap-4">
        {/* Card 1: Sales Performance */}
        <Card
          title={t("label:sales_performance")}
          icon={<FaChartBar className="text-blue-500" />}
          stat="$12,430"
        >
          {t("label:track_sales_performance")}
        </Card>

        {/* Card 2: New Users */}
        <Card
          title={t("label:new_users")}
          icon={<FaUsers className="text-green-500" />}
          stat="1,280"
        >
          {t("label:user_acquisition")}
        </Card>

        {/* Card 3: Orders */}
        <Card
          title={t("label:total_orders")}
          icon={<FaShoppingCart className="text-orange-500" />}
          stat="845"
        >
          {t("label:orders_overview")}
        </Card>

        {/* Chart Card */}
        <Card title={t("label:sales_overview")}>
          <CustomChartCard
            title={t("label:sales_overview")}
            type="area"
            multipleDatasets={true}
            useGradient={true}
          />
        </Card>
      </div>
    </div>
  );
}
