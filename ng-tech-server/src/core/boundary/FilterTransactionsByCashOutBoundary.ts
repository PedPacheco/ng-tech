import FilterTransactionsRequest from "../../entrypoint/request/FilterTransactionRequest";
import { TransactionsResponse } from "../models/Transactions.model";

export default interface FilterTransactionsByCashOutBoundary {
  execute: ({
    id,
  }: FilterTransactionsRequest) => Promise<
    (TransactionsResponse | undefined)[]
  >;
}
