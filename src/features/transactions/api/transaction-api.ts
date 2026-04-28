import { apiClient } from "@shared/api";
import type { TransactionFilters, TransactionsResponse,Transaction } from "../types";
import type { PageParams } from "@shared/types";



export const getTransactions = async (transactionFilters: TransactionFilters,pageParams:PageParams): Promise<TransactionsResponse> => {
    const { data } = await apiClient.post<TransactionsResponse>(`/transactions/search`, transactionFilters,{params: pageParams});
    return data;
}

export const createTransaction = async (transaction: Omit<Transaction, "id">): Promise<Transaction> => {
    const { data } = await apiClient.post<Transaction>(`/transactions`, transaction);
    return data;
}


export const updateTransaction = async (
    id: string,
    transaction: Omit<Transaction, "id">
): Promise<Transaction> => {
    const { data } = await apiClient.put<Transaction>(`/transactions/${id}`, transaction);
    return data;
}

export const deleteTransaction = async (id: string): Promise<void> => {
    await apiClient.delete(`/transactions/${id}`);
}


