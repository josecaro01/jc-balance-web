import { AddIcon, ButtonComponent, DateSelectorComponent } from "@shared/components";
import { CategorySelectComponent } from "@features/category/components";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import type { TransactionFilters } from "../types";
import { SetTransactionModal } from "./SetTransactionModal";



interface Props {
    onFilterChange: (filters: Partial<TransactionFilters>) => void
}
export const HeaderTransactionFilter = ({ onFilterChange }: Props) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleApplyFilters = (filters: Partial<TransactionFilters>) => {
        filters.categoryId = filters.categoryId === '' ? null : filters.categoryId;
        onFilterChange(filters);
    }

    return (<div>
        <DateSelectorComponent onFromChange={(from) => { handleApplyFilters({ from }) }} onToChange={(to) => { handleApplyFilters({ to }) }} />
        <div className='flex flex-row flex-nowrap gap-2 pb-6 items-end'>
            <CategorySelectComponent showAllOption={true} onChange={(categoryId) => { handleApplyFilters({  categoryId }) }} />
            <ButtonComponent children={t("transactions")} icon={AddIcon} onClick={() => { setIsModalOpen(true) }}></ButtonComponent>
        </div>
        <SetTransactionModal open={isModalOpen} onClose={() => { setIsModalOpen(false) }} transaction={null} />
    </div>

    );
}