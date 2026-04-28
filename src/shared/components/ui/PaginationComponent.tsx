import { useTranslation } from "react-i18next";
import { ButtonComponent } from "./ButtonComponent";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    actualTotalResults?: number; // Opcional, para mostrar el total de resultados reales si es diferente del número de resultados en la página actual
    totalResults: number;
}

export const PaginationComponent = ({ currentPage, totalPages, onPageChange, actualTotalResults, totalResults }: PaginationProps) => {
    const { t } = useTranslation();
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between px-5 py-4 bg-card border border-border rounded-2xl shadow-sm mt-4">
            <div className="hidden sm:block">
                <p className="text-sm text-slate-500">
                    {t("showingResults", { count: actualTotalResults, totalResults })}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <ButtonComponent arialLabel={t("previous")}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {t("previous")}
                </ButtonComponent>

                <div className="flex items-center gap-1 mx-4">
                    <span className="px-4 py-2 text-sm font-bold bg-primary/10 text-primary rounded-lg">
                        {currentPage}
                    </span>
                    <span className="text-slate-400 mx-1">de</span>
                    <span className=" py-2 text-sm font-medium text-slate-600">
                        {totalPages}
                    </span>
                </div>

                <ButtonComponent
                    arialLabel={t("next")}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}                >
                    {t("next")}
                </ButtonComponent>
            </div>
        </div>
    );
};