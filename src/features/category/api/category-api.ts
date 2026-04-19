import { apiClient } from "@shared/api";
import type { Category } from "../types";


export const categoryApi = {
    getCategories: async (): Promise<Category[]> => {
        const { data } = await apiClient.get<Category[]>(`/categories`);
        return data;
    },


};