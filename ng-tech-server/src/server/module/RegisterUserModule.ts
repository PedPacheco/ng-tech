import { RegisterUserUseCase } from '../../core/usecase/RegisterUserUseCase';
import { RegisterUserController } from '../../entrypoint/controller/RegisterUserController';
import { RegisterUserGateway } from '../../dataprovider/gateway/RegisterUserGateway';

export const RegisterUserModule = (): RegisterUserController => {
  const gateway = new RegisterUserGateway();
  const usecase = new RegisterUserUseCase(gateway);

  return new RegisterUserController(usecase);
};
