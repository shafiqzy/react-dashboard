import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEllipsisV } from "react-icons/fa";
import Card from "src/components/Card/Card";
import CustomChartCard from "./Card/CustomChart";
import TableCard from "./Table/Table";
import { getDashboardData } from "src/constants/Dashboard/Dashboard";

export default function DashboardPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<"this_month" | "last_month" | "2024">(
    "this_month"
  );

  const dashboardData = getDashboardData(filter);

  return (
    <div>
      {/* Title + Filter Button */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{t("label:dashboard")}</h1>
        <div className="flex items-center space-x-2">
          <select
            className="ds-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="2024">Year 2024</option>
          </select>
          <button className="ds-btn ds-btn-primary">
            {t("label:add_widget")}
          </button>
          <FaEllipsisV className="text-gray-500" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {dashboardData.cards.map((card) => (
          <Card
            key={card.id}
            title={t(card.titleKey)}
            icon={card.icon}
            stat={card.stat}
          >
            {t(card.descKey)}
          </Card>
        ))}
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card title={t("label:sales_overview")} className="row-span-2">
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

      {/* Recent Activity + Top Products */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card title={t("label:recent_activity")}>
          <ul className="list-disc pl-5">
            {dashboardData.recentActivity.map((activity) => (
              <li key={activity}>{t(activity)}</li>
            ))}
          </ul>
        </Card>

        <Card title={t("label:top_products")}>
          <ul className="list-decimal pl-5">
            {dashboardData.topProducts.map((product) => (
              <li key={product}>{t(product)}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
