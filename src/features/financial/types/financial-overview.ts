export interface BalanceTrend {
    yearMonth: string;
    income: number;
    expense: number;
    balance: number;
}

export interface ExpenseByCategory {
    categoryName: string;
    totalAmount: number;
}

export interface FinancialOverview {
    startDate: string;
    endDate: string;
    balanceTrendData: BalanceTrend[];
    expenseByCategoryData: ExpenseByCategory[];
}