
import { useTransactions, } from '../hooks';
import { HeaderTransactionFilter, SummaryBalance, TransactionSkeletonTable, TransactionList, TransactionTypeFilter } from '../components';
import { useAuth } from '@features/auth/hooks';
import { useEffect, useMemo, useState } from 'react';
import type { TransactionFilters } from '../types';
import { useSnackbar } from '@shared/hooks';
import { useTranslation } from 'react-i18next';


//Importar toast para los errores y corregir skeleton

export const TransanctionPage = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { showSnackbar } = useSnackbar();
    const [filters, setFilters] = useState<TransactionFilters>({ userId: user?.id ?? '', categoryId: null, from: null, to: null, type: null });
    const { getTransactions: { transactions, isLoading, isError, error } } = useTransactions(filters);
    const { totalIncome, totalExpense, netBalance } = useMemo(() => {
        const income = transactions?.reduce((acc, t) => t.type === 'INCOME' ? acc + t.amount : acc, 0) ?? 0;
        const expense = Math.abs(transactions?.reduce((acc, t) => t.type === 'EXPENSE' ? acc + t.amount : acc, 0) ?? 0);

        return {
            totalIncome: income,
            totalExpense: expense,
            netBalance: income - expense
        };
    }, [transactions]);

    useEffect(() => {
        if (isError && error) {
            const message = error.message || t('errorLoadingTransactions');
            showSnackbar(message, 'error');
        }
    }, [isError, error, showSnackbar]);

    return (<div>

        <HeaderTransactionFilter onFilterChange={(filters) => { setFilters(prev => ({ ...prev, ...filters })) }} />
        <SummaryBalance income={totalIncome} expense={totalExpense} balance={netBalance} />

        <TransactionTypeFilter value={filters.type} onChange={(type) => { setFilters((prev: TransactionFilters) => ({ ...prev, type })) }} />

        {isLoading ? (
            <TransactionSkeletonTable />
        ) : (
            <TransactionList
                data={transactions ?? []}
            />
        )}
    </div>)
}

