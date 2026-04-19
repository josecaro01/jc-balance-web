import { SelectComponent } from "@shared/components";
import { useCategory } from "../hooks";
import { useTranslation } from "react-i18next";

interface Props {
    initialCategoryId?: string;
    onChange?: (categoryId: string) => void;
    showAllOption?: boolean;

}

export const CategorySelectComponent = ({ initialCategoryId, onChange,showAllOption=false }: Props) => {
    const { t } = useTranslation();
    const { data: categories } = useCategory();

    return (
        <SelectComponent name="category" label={t('category')}   defaultValue={initialCategoryId} onChange={(e) => onChange?.(e.target.value)}>
            {showAllOption && (
                <option  value="">{t('all')}</option>
            )}
            {categories?.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </SelectComponent>
    );
};