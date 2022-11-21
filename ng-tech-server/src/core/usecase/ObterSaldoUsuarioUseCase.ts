import idUserRequest from "../../entrypoint/request/IdUserRequest";
import ObterSaldoUsuarioBoundary from "../boundary/ObterSaldoUsuarioBoundary";

export class ObterSaldoUsuarioUseCase {
  public constructor(private readonly boundary: ObterSaldoUsuarioBoundary) {
    this.boundary = boundary;
  }
  execute(id: idUserRequest) {
    const response = this.boundary.execute(id);

    return response;
  }
}