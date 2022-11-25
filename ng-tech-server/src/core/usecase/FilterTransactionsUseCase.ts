import FilterTransactionsRequest from "../../entrypoint/request/FilterTransactionRequest";
import FilterTransactionsByDateBoundary from "../boundary/FilterTransactionsByDateBoundary";
import FilterTransactionsByCashOutBoundary from "../boundary/FilterTransactionsByCashOutBoundary";
import FilterTransactionsByCashInBoundary from "../boundary/FilterTransactionsByCashInBoundary";

export class FilterTransactionsUseCase {
  public constructor(
    private readonly dateBoundary: FilterTransactionsByDateBoundary,
    private readonly cashInBoundary: FilterTransactionsByCashInBoundary,
    private readonly cashOutBoundary: FilterTransactionsByCashOutBoundary,
  ) {
    this.dateBoundary = dateBoundary;
    this.cashInBoundary = cashInBoundary;
    this.cashOutBoundary = cashOutBoundary;
  }
  execute({ id, filter, date }: FilterTransactionsRequest) {
    if (filter === "transacoes-data") {
      const response = this.dateBoundary.execute({ id, date });
      return response;
    }

    if (filter === "transacoes-cash-out") {
      const response = this.cashOutBoundary.execute({ id });
      return response;
    }

    if (filter === "transacoes-cash-in") {
      const response = this.cashInBoundary.execute({ id });
      return response;
    }
  }
}
