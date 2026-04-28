import type { PaginatedResult } from "@shared/types";
import type { Transaction } from "./transaction";
import type { TransactionFilters } from "./transaction-filters";

export interface TransactionsResponse {
  transactions: PaginatedResult<Transaction>;
  appliedFilters: TransactionFilters;
  summaryBalance: { income: number; expense: number; balance: number; }
}