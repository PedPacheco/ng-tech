import UsuarioRequest from "../../entrypoint/request/UsuarioRequest";
import LoginUsuarioBoundary from "../boundary/LoginUsuarioBoundary";

export class LoginUsuarioUseCase {
  public constructor(private readonly boundary: LoginUsuarioBoundary) {
    this.boundary = boundary;
  }
  execute(body: UsuarioRequest) {
    const response = this.boundary.execute(body);

    return response;
  }
}