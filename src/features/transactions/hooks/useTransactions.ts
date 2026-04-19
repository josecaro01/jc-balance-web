import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from '../api';
import type { Transaction, TransactionFilters, TransactionsResponse } from '../types';

export const useTransactions = (filters: TransactionFilters | null) => {
    const queryClient = useQueryClient();

    const { data, isLoading, isFetching, refetch, error, isError } = useQuery<TransactionsResponse>({
        queryKey: filters ? ["transactions", filters] : ["transactions"],
        queryFn: () => getTransactions(filters!),
        staleTime: 1000 * 60 * 10,
        enabled: !!filters?.userId,
    });



    const createTransactionMutation = useMutation({
        mutationFn: createTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["transactions"]
            })
        }
    });

    const updateTransactionMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Omit<Transaction, 'id'> }) => updateTransaction(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["transactions"]
            })
        }
    });

    const deleteTransactionMutation = useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["transactions"]
            })
        }
    });


    return {
        getTransactions: {
            transactions: data?.transactions ?? [],
            totalResults: data?.totalResults ?? 0,
            appliedFilters: data?.appliedFilters,
            isLoading,
            isFetching,
            refetch,
            isError,
            error

        },
        createTransaction: createTransactionMutation,
        updateTransaction: updateTransactionMutation,
        deleteTransaction: deleteTransactionMutation,
    };
}
