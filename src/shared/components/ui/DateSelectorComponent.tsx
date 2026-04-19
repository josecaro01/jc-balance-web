import { useState, useRef, useEffect } from "react";
import { InputComponent } from ".";
import { useSnackbar } from "@shared/hooks";
import { useTranslation } from "react-i18next";

interface Props {
    onFromChange: (value: string) => void;
    onToChange: (value: string) => void;
};


export const DateSelectorComponent = ({ onFromChange, onToChange }: Props) => {
    const { t } = useTranslation();
    const timerRef = useRef<number | null>(null);
    const { showSnackbar } = useSnackbar();

    const [dateFilters, setDateFilters] = useState(() => {
        const today = new Date();
        const thirtyDaysAgo = new Date();

        thirtyDaysAgo.setDate(today.getDate() - 30);

        return {
            from: thirtyDaysAgo.toISOString().split('T')[0],
            to: today.toISOString().split('T')[0]
        };
    });
    const lastValidFilters = useRef(dateFilters);


    useEffect(() => {
        onFromChange(dateFilters.from);
        onToChange(dateFilters.to);

    }, []);

    const handleDateChange = (key: 'from' | 'to', value: string) => {
        setDateFilters(prev => ({ ...prev, [key]: value }));

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            const selectedDate = new Date(value);
            const year = selectedDate.getFullYear();

            const isValidDate = !isNaN(selectedDate.getTime()) && year >= 1900 && year <= 2100;

            if (!isValidDate) {
                showSnackbar("Fecha no válida (1900 - 2100)", "error");
                // Restauramos a la última fecha buena conocida
                setDateFilters(prev => ({ ...prev, [key]: lastValidFilters.current[key] }));
                return;
            }


            const isFrom = key === 'from';
            const otherValue = isFrom ? lastValidFilters.current.to : lastValidFilters.current.from;

            const isRangeInvalid = isFrom
                ? value > otherValue
                : value < otherValue;

            if (isRangeInvalid && otherValue !== '') {
                showSnackbar("La fecha de inicio no puede ser posterior a la de fin", "warning");
                // Restauramos a la última fecha buena conocida
                setDateFilters(prev => ({ ...prev, [key]: lastValidFilters.current[key] }));
                return;
            }

            lastValidFilters.current = {
                ...lastValidFilters.current,
                [key]: value
            };

            if (isFrom) onFromChange(value);
            else onToChange(value);

        }, 800);
    };



    return (
        <div className="flex flex-col sm:flex-row gap-3 pb-6">
            <InputComponent id="from-date" label={t('from')} type="date" value={dateFilters.from} onChange={(e) => handleDateChange('from', e.target.value)} />
            <InputComponent id="to-date" label={t('to')} type="date" value={dateFilters.to} onChange={(e) => handleDateChange('to', e.target.value)} />
        </div>
    );
}