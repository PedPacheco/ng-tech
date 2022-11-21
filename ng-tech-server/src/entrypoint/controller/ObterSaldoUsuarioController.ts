import { ObterSaldoUsuarioUseCase } from "../../core/usecase/ObterSaldoUsuarioUseCase";
import idUserRequest from "../request/IdUserRequest";

export class ObterSaldoUsuarioController {
  public constructor(private readonly useCase: ObterSaldoUsuarioUseCase) {
    this.useCase = useCase;
  }

  handle(reqParams: idUserRequest, reqQuery: any, reqBody: any) {
    const { id } = reqParams;

    return this.useCase.execute({
      id,
    });
  }
}
