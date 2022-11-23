import { GetUserBalanceUseCase } from "../../core/usecase/GetUserBalanceUseCase";
import idUserRequest from "../request/IdUserRequest";

export class GetUserBalanceController {
  public constructor(private readonly useCase: GetUserBalanceUseCase) {
    this.useCase = useCase;
  }

  handle(reqParams: idUserRequest, reqQuery: any, reqBody: any) {
    const { id } = reqParams;

    return this.useCase.execute({ id });
  }
}
