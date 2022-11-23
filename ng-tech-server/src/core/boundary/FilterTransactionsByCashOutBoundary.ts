import FilterTransactionsRequest from "../../entrypoint/request/FilterTransactionRequest";

interface Transactions {
  debitedUsername: string | undefined
  creditedUsername: string | undefined;
  value: any;
  createdAt: any;
}

export default interface FilterTransactionsByCashInBoundary {
  execute: ({
    id,
    filter,
  }: FilterTransactionsRequest) => Promise<(Transactions | undefined)[] | undefined>;
}
