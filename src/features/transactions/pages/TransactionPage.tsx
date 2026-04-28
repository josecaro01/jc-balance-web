
import { useTransactions, } from '../hooks';
import { HeaderTransactionFilter, SummaryBalance, TransactionSkeletonTable, TransactionList, TransactionTypeFilter } from '../components';
import { useAuth } from '@features/auth/hooks';
import { useEffect, useState } from 'react';
import type { TransactionFilters } from '../types';
import { useSnackbar } from '@shared/hooks';
import { useTranslation } from 'react-i18next';
import { PaginationComponent } from '@shared/components';
import type { PageParams } from '@shared/types';



export const TransanctionPage = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { showSnackbar } = useSnackbar();
    const [filters, setFilters] = useState<TransactionFilters>({ userId: user?.id ?? '', categoryId: null, from: null, to: null, type: null });
    const [pageParam, setPageParam] = useState<PageParams>({ page: 1, size: 20 });
    const { getTransactions: { transactions, summaryBalance, isLoading, isError, error } } = useTransactions(filters,pageParam);

    useEffect(() => {
        if (isError && error) {
            const message = error.message || t('errorLoadingTransactions');
            showSnackbar(message, 'error');
        }
    }, [isError, error, showSnackbar]);

    return (<div>

        <HeaderTransactionFilter onFilterChange={(filters) => { setFilters(prev => ({ ...prev, ...filters })) }} />
        <SummaryBalance income={summaryBalance.income} expense={summaryBalance.expense} balance={summaryBalance.balance} />

        <TransactionTypeFilter value={filters.type} onChange={(type) => { setFilters((prev: TransactionFilters) => ({ ...prev, type })) }} />

        {isLoading ? (
            <TransactionSkeletonTable />
        ) : (<>
            <TransactionList
                data={transactions?.content ?? []}
            />
            <PaginationComponent currentPage={transactions?.currentPage ?? 1} totalPages={transactions?.totalPages ?? 1} totalResults={transactions?.totalElements ?? 0} actualTotalResults={transactions?.content.length ?? 0} onPageChange={(page) => { setPageParam(prev => ({ ...prev, page })) }} />
        </>)}
    </div>)
}

