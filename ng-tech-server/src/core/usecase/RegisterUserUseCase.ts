import UsuarioRequest from "../../entrypoint/request/UsuarioRequest";
import RegisterUserBoundary from "../boundary/RegisterUserBoundary";
import bcrypt from 'bcrypt'

export class RegisterUserUseCase {
  public constructor(private readonly boundary: RegisterUserBoundary) {
    this.boundary = boundary;
  }
  execute(body: UsuarioRequest) {
    const password = bcrypt.hashSync(body.password, Number(process.env.SALT))
    const username = body.username
    const response = this.boundary.execute({username, password});

    return response;
  }
}