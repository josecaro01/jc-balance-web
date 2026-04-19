import { useTranslation } from "react-i18next";

export const TransactionSkeletonTable = () => {
    const { t } = useTranslation();
    const rows = Array.from({ length: 5 });

    return (
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
                    {rows.map((_, i) => (
                        <tr key={i} className="animate-pulse">
                            {/* Concepto */}
                            <td className="p-5">
                                <div className="flex items-center gap-3">
                                    <div className="shrink-0 w-8 h-8 rounded-full bg-surface/50" />
                                    <div className="h-5 bg-surface/50 rounded w-32" />
                                </div>
                            </td>

                            {/* Categoría */}
                            <td className="p-5">
                                <div className="h-5 bg-surface/50 rounded w-24" />
                            </td>

                            {/* Fecha */}
                            <td className="p-5">
                                <div className="h-5 bg-surface/50 rounded w-20" />
                            </td>

                            {/* Monto */}
                            <td className="p-5 text-center">
                                <div className="h-5 bg-surface/50 rounded w-16 mx-auto" />
                            </td>

                            {/* Acciones */}
                            <td className="p-5 text-right sticky right-0">
                                <div className="flex justify-end gap-3">
                                    <div className="w-5 h-5 bg-surface/50 rounded" />
                                    <div className="w-5 h-5 bg-surface/50 rounded" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};