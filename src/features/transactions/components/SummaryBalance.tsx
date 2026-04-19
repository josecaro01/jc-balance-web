import { formatCurrency } from "@shared/utils";
import { useTranslation } from "react-i18next";

interface SummaryCardsProps {
  income: number;
  expense: number;
  balance: number;
  isLoading?: boolean;
}

export const SummaryBalance = ({ income, expense, balance, isLoading }: SummaryCardsProps) => {
  const {t} = useTranslation();
  const cardData = [
    { label: t('totalIncome'), value: income, color: 'text-green-500', },
    { label: t('totalExpense'), value: expense, color: 'text-red-500', },
    { label: t('balance'), value: balance, color: 'text-zinc-500', },
  ];

  return (
    <div className="flex flex-col sm:flex-row flex-nowrap gap-4 pb-6">
      {cardData.map((card) => (
        <div key={card.label} className="flex-1 min-w-0 p-4 rounded-2xl border border-border shadow-sm bg-card">
          <div className="overflow-hidden">
            <p className="text-[10px] opacity-60 uppercase font-black tracking-tighter truncate ">
              {card.label}
            </p>
            {isLoading ? (
              <div className="h-8 w-24 bg-surface/50 rounded animate-pulse mt-1 " />
            ) : (
              <p className={`text-2xl ${card.color} truncate`}>
                {formatCurrency(card.value)} 
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};