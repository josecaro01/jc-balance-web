import { apiClient } from "@shared/api";
import type { FinancialOverview, FinancialOverviewFilter } from "../types";


export const financialApi = {
    getFinancialOverview: async (financialOverviewFilter: FinancialOverviewFilter): Promise<FinancialOverview> => {
        const {data} = await apiClient.post<FinancialOverview>(`/financials`, financialOverviewFilter);
        return data;
    },


};