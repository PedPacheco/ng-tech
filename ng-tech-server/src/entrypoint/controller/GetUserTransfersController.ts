import { GetUserTransfersUseCase } from "../../core/usecase/GetUserTransfersUseCase";
import idUserRequest from "../request/IdUserRequest";

export class GetUserTransfersController {
  public constructor(private readonly useCase: GetUserTransfersUseCase) {
    this.useCase = useCase;
  }

  handle(reqParams: idUserRequest, reqQuery: any, reqBody: any) {
    const { id } = reqParams;

    return this.useCase.execute({
      id,
    });
  }
}
