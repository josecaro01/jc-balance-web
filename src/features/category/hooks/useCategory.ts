import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "../api";


export const useCategory = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApi.getCategories(),
        staleTime: 1000 * 60 * 10,

    });
};