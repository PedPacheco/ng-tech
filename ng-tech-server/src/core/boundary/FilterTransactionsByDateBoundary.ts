import { Transactions } from "@prisma/client";
import FilterTransactionsRequest from "../../entrypoint/request/FilterTransactionRequest";

export default interface FilterTransactionsByDateBoundary {
  execute: ({
    id,
    date,
  }: FilterTransactionsRequest) => Promise<
   unknown
  >;
}
