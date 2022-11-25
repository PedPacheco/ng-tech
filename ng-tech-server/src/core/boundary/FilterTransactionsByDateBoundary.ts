import FilterTransactionsRequest from "../../entrypoint/request/FilterTransactionRequest";
import { TransactionsResponse } from "../models/Transactions.model";

export default interface FilterTransactionsByDateBoundary {
  execute: ({
    id,
    date,
  }: FilterTransactionsRequest) => Promise<
    (TransactionsResponse | undefined)[] | undefined
  >;
}
