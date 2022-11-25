import FilterTransactionsRequest from "../../entrypoint/request/FilterTransactionRequest";
import { TransactionsResponse } from "../models/Transactions.model";

export default interface FilterTransactionsByCashInBoundary {
  execute: ({
    id,
  }: FilterTransactionsRequest) => Promise<
    (TransactionsResponse | undefined)[]
  >;
}
