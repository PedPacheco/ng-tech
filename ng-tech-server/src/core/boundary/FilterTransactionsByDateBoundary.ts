import FilterTransactionsRequest from "../../entrypoint/request/FilterTransactionRequest";

interface Transactions {
  debitedUsername: string | undefined;
  creditedUsername: string | undefined;
  value: any;
  createdAt: any;
}

export default interface FilterTransactionsBoundary {
  execute: ({
    id,
    date,
  }: FilterTransactionsRequest) => Promise<
    (Transactions | undefined)[] | undefined
  >;
}
