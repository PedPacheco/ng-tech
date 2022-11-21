import { RegisterUserUseCase } from '../../core/usecase/RegisterUserUseCase';
import UsuarioRequest from '../request/UsuarioRequest';

export class RegisterUserController {
  public constructor(private readonly useCase: RegisterUserUseCase) {
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
