import { useQuery } from "@tanstack/react-query";
import { financialApi } from "../api";
import type { FinancialOverviewFilter } from "../types";


export const useFinancialOverview = (filters: FinancialOverviewFilter) => {
    return useQuery({
        queryKey: ['financial-overview', filters],
        queryFn: () => financialApi.getFinancialOverview(filters),
        staleTime: 1000 * 60 * 10,
        enabled: !!filters.userId && !!filters.from && !!filters.to,
    });
};