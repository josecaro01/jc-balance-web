import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  type PieSectorShapeProps,
  Sector
} from "recharts";

import { useTranslation } from "react-i18next";
import type { FinancialOverview } from "../types";
import { PieChartIcon } from "@shared/components";


const COLORS = [
  "#FF7F50",
  "#4682B4",
  "#6A5ACD",
  "#DA70D6",
  "#2E8B57",
  "#FFD700",
  "#008B8B",
  "#B22222",
  "#708090",
  "#32CD32"
];

interface Props { financialOverview: FinancialOverview };

const MyCustomPie = (props: PieSectorShapeProps) => <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;

export const TransactionsByCategoryChart = ({ financialOverview }: Props) => {
  const { t } = useTranslation();

  // 1. Lógica de validación
  const hasData = financialOverview?.expenseByCategoryData && financialOverview.expenseByCategoryData.length > 0;

  return (
    <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-6">
      <div>
        <p className="text-lg font-bold">{t("expensesByCategory")}</p>
        <p className="text-sm text-slate-500">{t("expensesByCategoryDescription")}</p>
      </div>

      <div className="h-80 w-full flex items-center justify-center">
        {hasData ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={financialOverview.expenseByCategoryData}
                dataKey="totalAmount"
                nameKey="categoryName"
                outerRadius={110}
                label
                shape={MyCustomPie}
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          // 2. Diseño cuando no hay datos
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <div className="size-20 bg-slate-100 rounded-full flex items-center justify-center">
              <PieChartIcon className="text-slate-400" width={48} height={48} />
            </div>
            <p className="text-slate-400 font-medium">{t("noDataAvailable")}</p>
          </div>
        )}
      </div>
    </div>
  );
};