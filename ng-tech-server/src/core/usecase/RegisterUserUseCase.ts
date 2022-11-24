import bcrypt from "bcrypt";
import UsuarioRequest from "../../entrypoint/request/UsuarioRequest";
import RegisterUserBoundary from "../boundary/RegisterUserBoundary";

export class RegisterUserUseCase {
  public constructor(private readonly boundary: RegisterUserBoundary) {
    this.boundary = boundary;
  }
  execute(body: UsuarioRequest) {
    const password = bcrypt.hashSync(body.password, Number(process.env.SALT));
    const username = body.username;
    const response = this.boundary.execute({ username, password });

    return response;
  }
}
