import { LoginUsuarioUseCase } from "../../core/usecase/LoginUsuarioUseCase";
import { LoginUsuarioGateway } from "../../dataprovider/gateway/LoginUsuarioGateway";
import { LoginUsuarioController } from "../../entrypoint/controller/LoginUsuarioController";

export const LoginUsuarioModule = (): LoginUsuarioController => {
  const gateway = new LoginUsuarioGateway();
  const usecase = new LoginUsuarioUseCase(gateway);

  return new LoginUsuarioController(usecase);
};
