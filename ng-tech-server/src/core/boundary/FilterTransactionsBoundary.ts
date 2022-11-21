import FilterTransactionsRequest from "../../entrypoint/request/FilterTransactionRequest";

interface Transactions {
  username: string | undefined;
  value: any;
  createdAt: any;
}

export default interface FilterTransactionsBoundary {
  execute: ({
    id,
    filter,
    date,
  }: FilterTransactionsRequest) => Promise<(Transactions | undefined)[] | undefined>;
}
