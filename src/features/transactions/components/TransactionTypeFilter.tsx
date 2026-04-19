import { useTranslation } from 'react-i18next';


interface Props {
    value: 'INCOME' | 'EXPENSE' | null
    onChange: (value: 'INCOME' | 'EXPENSE' | null) => void
}

export const TransactionTypeFilter = ({ value, onChange }: Props) => {
    const { t } = useTranslation();

    const onCategoryChange = (newCategory: 'INCOME' | 'EXPENSE' | null) => {
        onChange(newCategory);
    };

    return (<div className="flex flex-row gap-1 justify-items-start align-middle mb-6 flex-nowrap border border-border rounded-lg shadow-sm border-borde cursor-pointer w-fit" >
        <div className={`py-2 px-4 rounded-lg transition-colors duration-300  ${value == null && ' bg-primary text-primary-text'}`} onClick={() => onCategoryChange(null)}>{t('all')}</div>
        <div className={`py-2 px-4 rounded-lg transition-colors duration-300 ${value == 'INCOME' && ' bg-primary  text-primary-text'}`} onClick={() => onCategoryChange('INCOME')}>{t('income')}</div>
        <div className={`py-2 px-4 rounded-lg transition-colors duration-300 ${value == 'EXPENSE' && ' bg-primary  text-primary-text'}`} onClick={() => onCategoryChange('EXPENSE')}>{t('expense')}</div>
    </div>);
}