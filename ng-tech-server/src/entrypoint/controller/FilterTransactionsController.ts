import { FilterTransactionsUseCase } from "../../core/usecase/FilterTransactionsUseCase";
import idUserRequest from "../request/IdUserRequest";

export class FilterTransactionsController {
  public constructor(private readonly useCase: FilterTransactionsUseCase) {
    this.useCase = useCase;
  }

  handle(reqParams: idUserRequest, reqQuery: any, reqBody: any) {
    const { id } = reqParams;
    const { filter, date } = reqQuery;

    return this.useCase.execute({
      id,
      filter,
      date,
    });
  }
}
