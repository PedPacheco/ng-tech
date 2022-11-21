import FilterTransactionsRequest from "../../entrypoint/request/FilterTransactionRequest";
import FilterTransactionsBoundary from "../boundary/FilterTransactionsBoundary";

export class FilterTransactionsUseCase {
  public constructor(private readonly boundary: FilterTransactionsBoundary) {
    this.boundary = boundary;
  }
  execute({ id, filter, date }: FilterTransactionsRequest) {
    const response = this.boundary.execute({ id, filter, date });

    return response;
  }
}