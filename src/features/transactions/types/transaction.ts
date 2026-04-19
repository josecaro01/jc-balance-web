export interface Transaction {
    id: string;
    name: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    description: string;
    date: string; // ISO string
    userId: string;
    categoryName: string;
    categoryId?: string;
}