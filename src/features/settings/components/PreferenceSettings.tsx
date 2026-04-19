import { CurrencyIcon, GlobeIcon,  } from '@shared/components'
import { useCurrency } from '@shared/hooks';
import { useTranslation } from 'react-i18next';

export const PreferenceSettings = () => {
    const { t, i18n } = useTranslation();
    const { currency, setCurrency } = useCurrency();

    return (
        <section className="p-6 rounded-2xl border border-border shadow-sm bg-card space-y-4">
            <h2 className="text-lg font-bold tracking-tight">{t('preferences')}</h2>
            <p className="text-sm text-slate-500">{t('optionsDescription')}</p>

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <GlobeIcon width={20} height={20} />
                        <span>{t('language')}</span>
                    </div>
                    <select
                        value={i18n.language}
                        onChange={(e) => i18n.changeLanguage(e.target.value as any)}
                        className="px-3 py-2 rounded-lg border border-border bg-card"
                    >
                        <option value="es-ES">{t('spanish')}</option>
                        <option value="en-US">{t('english')}</option>
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <CurrencyIcon width={20} height={20} />
                        <span>{t('currency')}</span>
                    </div>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as any)}
                        className="px-3 py-2 rounded-lg border border-border bg-card"
                    >
                        <option value="EUR">EUR (€)</option>
                        <option value="USD">USD ($)</option>
                    </select>
                </div>
            </div>
        </section>
    );
}