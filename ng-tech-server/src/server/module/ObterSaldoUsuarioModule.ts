import { ObterSaldoUsuarioUseCase } from "../../core/usecase/ObterSaldoUsuarioUseCase";
import { ObterSaldoUsuarioGateway } from "../../dataprovider/gateway/ObterSaldoUsuarioGateway";
import { ObterSaldoUsuarioController } from "../../entrypoint/controller/ObterSaldoUsuarioController";

export const ObterSaldoUsuarioModule = (): ObterSaldoUsuarioController => {
  const gateway = new ObterSaldoUsuarioGateway();
  const usecase = new ObterSaldoUsuarioUseCase(gateway);

  return new ObterSaldoUsuarioController(usecase);
};
