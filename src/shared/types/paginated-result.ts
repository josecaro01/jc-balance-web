

export interface PaginatedResult<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    size: number;
    sortBy: string;
    direction: string;
}