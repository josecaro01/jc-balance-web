export interface TransactionFilters {
    userId: string;
    categoryId: string | null;
    type: 'INCOME' | 'EXPENSE' | null;
    from: string | null;
    to: string| null;
}