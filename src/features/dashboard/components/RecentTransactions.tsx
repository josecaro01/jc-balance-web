import { formatCurrency } from "@shared/utils";

const transactions = [
  {
    id: 1,
    concept: "Salary",
    category: "Job",
    date: "2026-03-01",
    amount: 3200,
    type: "income"
  },
  {
    id: 2,
    concept: "Netflix",
    category: "Subscription",
    date: "2026-03-01",
    amount: 12,
    type: "expense"
  },
  {
    id: 3,
    concept: "Supermarket",
    category: "Food",
    date: "2026-02-28",
    amount: 45,
    type: "expense"
  },
  {
    id: 4,
    concept: "Gasoline",
    category: "Transport",
    date: "2026-02-27",
    amount: 60,
    type: "expense"
  },
  {
    id: 5,
    concept: "Spotify",
    category: "Subscription",
    date: "2026-02-26",
    amount: 10,
    type: "expense"
  }
];

export const RecentTransactions = () => {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Recent transactions</h3>
      </div>

      <div className="flex flex-col divide-y divide-border">

        {transactions.map((t) => {

          const isIncome = t.type === "income";

          return (
            <div
              key={t.id}
              className="flex items-center justify-between py-3"
            >

              <div className="flex flex-col">
                <span className="font-medium">
                  {t.concept}
                </span>

                <span className="text-sm text-slate-500">
                  {t.category}
                </span>
              </div>

              <div className="text-right">

                <span
                  className={`font-semibold ${
                    isIncome
                      ? "text-emerald-500"
                      : "text-rose-500"
                  }`}
                >
                    {formatCurrency(t.amount)}
                </span>

                <div className="text-xs text-slate-500">
                  {t.date}
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};