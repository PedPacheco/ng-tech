import { LoginUsuarioUseCase } from '../../core/usecase/LoginUsuarioUseCase';
import UsuarioRequest from '../request/UsuarioRequest';

export class LoginUsuarioController {
  public constructor(private readonly useCase: LoginUsuarioUseCase) {
    this.useCase = useCase;
  }

  handle(reqParams: any, reqQuery: any, reqBody: UsuarioRequest) {
    const { username, password } = reqBody;

    return this.useCase.execute({
      username,
      password,
    });
  }
}
