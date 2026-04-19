import type { Transaction, TransactionFilters } from "../";

export interface TransactionsResponse {
  transactions: Transaction[];
  appliedFilters: TransactionFilters;
  totalResults: number;
}