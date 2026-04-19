import { useState } from 'react'
import { EditIcon, TrashIcon } from '@shared/components';
import type { Transaction } from '../types';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@shared/utils';
import { SetTransactionModal } from './SetTransactionModal';
import { DeleteTransactionModal } from './DeleteTransactionModal';


interface TransactionListProps {
    data: Transaction[]
}

export const TransactionList = ({ data }: TransactionListProps) => {
    const { t } = useTranslation();
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
    const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null)

    return (<div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full text-left border-collapse table-fixed min-w-200">
                <thead>
                    <tr className="bg-surface border-b border-border">
                        <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wider w-[35%]">{t('concept')}</th>
                        <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wider w-[20%]">{t('category')}</th>
                        <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wider w-[15%]">{t('date')}</th>
                        <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-center w-[15%]">{t('amount')}</th>
                        <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-right w-[15%] sticky right-0 bg-surface shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.05)]">
                            {t('actions')}
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {data?.map((t) => (
                        <tr key={t.id} className="hover:bg-surface/50 transition-colors group">
                            {/* Concepto: Máximo 2 líneas */}
                            <td className="p-5">
                                <div className="flex items-center gap-3">
                                    <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full font-bold text-lg ${t.type === 'INCOME' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                                        }`}>
                                        {t.type === 'INCOME' ? '+' : '-'}
                                    </div>
                                    <span className="font-bold text-page-text line-clamp-2 leading-tight">
                                        {t.name}
                                    </span>
                                </div>
                            </td>

                            <td className="p-5">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-blue-600 truncate block w-fit max-w-full">
                                    {t.categoryName}
                                </span>
                            </td>

                            <td className="p-5 text-sm text-slate-500 font-medium truncate whitespace-nowrap">
                                {t.date}
                            </td>

                            <td className={`p-5 text-center font-bold text-lg truncate whitespace-nowrap ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'
                                }`}>
                                {formatCurrency(t.amount)}
                            </td>

                            <td className="p-5 text-right sticky right-0 bg-card group-hover:bg-surface transition-colors shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.05)]">
                                <div className="flex justify-end gap-3 text-slate-400">
                                    <button className="hover:text-primary transition-colors cursor-pointer" onClick={() => setEditingTransaction(t)}>
                                        <EditIcon width={20} height={20} />
                                    </button>
                                    <button className="hover:text-rose-600 transition-colors cursor-pointer" onClick={() => setDeletingTransaction(t)}>
                                        <TrashIcon width={20} height={20} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <SetTransactionModal key={`set-${editingTransaction?.id ?? null}`} transaction={editingTransaction} open={!!editingTransaction} onClose={() => setEditingTransaction(null)} />
        <DeleteTransactionModal key={`deleting-${deletingTransaction?.id ?? null}`} transaction={deletingTransaction} open={!!deletingTransaction} onClose={() => setDeletingTransaction(null)} />
    </div>);
}