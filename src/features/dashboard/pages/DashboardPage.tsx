import { SummaryBalance } from '@features/transactions/components';
import { useEffect, useMemo, useState } from 'react';
import { BalanceTrendChart, TransactionsByCategoryChart } from '@features/financial/components';
import { useAuth } from '@features/auth/hooks';
import { useSnackbar } from '@shared/hooks';
import { DateSelectorComponent } from '@shared/components';
import { useTranslation } from 'react-i18next';
import { useFinancialOverview } from '@features/financial/hooks';

export const DashboardPage = () => {

    const { user } = useAuth();
    const { showSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [dateFilters, setDateFilters] = useState<{ from: string; to: string }>({ from: '', to: '' });
    const { data, isError, error } = useFinancialOverview({ ...dateFilters, userId: user?.id || '' });
    const { balance, expense, income } = useMemo(() => {
        if (!data?.balanceTrendData) {
            return { balance: 0, expense: 0, income: 0 };
        }

        return data.balanceTrendData.reduce((acc, item) => {
            acc.balance += item.balance;
            acc.expense += item.expense;
            acc.income += item.income;
            return acc;
        }, { balance: 0, expense: 0, income: 0 });
    }, [data?.balanceTrendData]);



    useEffect(() => {
        if (isError && error) {
            const message = error.message || t('errorLoadingFinancialOverview');
            showSnackbar(message, 'error');
        }
    }, [isError, error, showSnackbar]);



    return (<div>
        <DateSelectorComponent onFromChange={(from) => { setDateFilters(prev => ({ ...prev, from })) }} onToChange={(to) => { setDateFilters(prev => ({ ...prev, to })) }} />
        <SummaryBalance balance={balance} expense={expense} income={income} />
        <div className="grid gap-6 lg:grid-cols-2 pb-6">
            <BalanceTrendChart financialOverview={data || { balanceTrendData: [], expenseByCategoryData: [], startDate: '', endDate: '' }} />
            <TransactionsByCategoryChart financialOverview={data || { balanceTrendData: [], expenseByCategoryData: [], startDate: '', endDate: '' }} />
        </div>
    </div>)
}