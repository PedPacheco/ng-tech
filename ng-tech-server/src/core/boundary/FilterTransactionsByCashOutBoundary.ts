import { Transactions } from "@prisma/client";
import FilterTransactionsRequest from "../../entrypoint/request/FilterTransactionRequest";

export default interface FilterTransactionsByCashOutBoundary {
  execute: ({
    id,
  }: FilterTransactionsRequest) => Promise<
   unknown
  >;
}
