import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from '../api';
import type { Transaction, TransactionFilters, TransactionsResponse } from '../types';
import type { PageParams } from '@shared/types';

export const useTransactions = (filters?: TransactionFilters, pageParam?: PageParams) => {
    const pageParamWithDefaults = pageParam ?? { page: 1, size: 20 };
    const queryClient = useQueryClient();
    //TODO(JOSE); Refactor this to mutations
    const { data, isLoading, isFetching, refetch, error, isError } = useQuery<TransactionsResponse>({
        queryKey: filters ? ["transactions", filters, pageParamWithDefaults] : ["transactions", pageParamWithDefaults],
        queryFn: () => getTransactions(filters!, pageParamWithDefaults),
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
            transactions: data?.transactions ?? null,
            summaryBalance: data?.summaryBalance ?? { income: 0, expense: 0, balance: 0 },
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
