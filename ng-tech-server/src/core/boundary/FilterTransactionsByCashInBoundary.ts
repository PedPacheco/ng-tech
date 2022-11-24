
import FilterTransactionsRequest from "../../entrypoint/request/FilterTransactionRequest";

export default interface FilterTransactionsByCashInBoundary {
  execute: ({
    id
  }: FilterTransactionsRequest) => Promise<
    unknown
  >;
}
