import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import type { FinancialOverview } from '../types';
import { useTranslation } from "react-i18next";
import { TrendIcon } from "@shared/components";

interface Props { financialOverview: FinancialOverview };

export const BalanceTrendChart = ({ financialOverview }: Props) => {
  const { t } = useTranslation();
  const data = financialOverview?.balanceTrendData || [];
  const hasData = data.length > 0;

  return (
    <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-6">
      <div>
        <p className="text-lg font-bold">{t('balanceTrend')}</p>
        <p className="text-sm text-slate-500">{t('balanceTrendDescription')}</p>
      </div>

      <div className="h-80 w-full flex items-center justify-center">
        {hasData ? (
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              {/* Grid sutil: Solo horizontal para no ensuciar */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

              {/* Ejes limpios: Sin líneas de eje, solo texto tenue */}
              <XAxis
                dataKey="yearMonth"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />

              {/* Tooltip Estilo "Card" */}
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />

              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: '600' }}
              />

              {/* Líneas modernas: Sin puntos (dots), solo se ven al pasar el mouse */}
              <Line
                type="monotone"
                dataKey="income"
                name={t('income')}
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />

              <Line
                type="monotone"
                dataKey="expense"
                name={t('expense')}
                stroke="#ef4444"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />

              <Line
                type="monotone"
                dataKey="balance"
                name={t('balance')}
                stroke="#3b82f6"
                strokeWidth={4} // El balance un poco más grueso por importancia
                dot={false}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          /* Estado vacío coherente con la PieChart */
          // 2. Diseño cuando no hay datos
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <div className="size-20 bg-slate-100 rounded-full flex items-center justify-center">
              <TrendIcon className="text-slate-400" width={48} height={48} />
            </div>
            <p className="text-slate-400 font-medium">{t("noDataAvailable")}</p>
          </div>
        )}
      </div>
    </div>
  );
};