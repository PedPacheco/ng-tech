import { GetUserBalanceUseCase } from "../../core/usecase/GetUserBalanceUseCase";
import { GetUserBalanceGateway } from "../../dataprovider/gateway/GetUserBalanceGateway";
import { GetUserBalanceController } from "../../entrypoint/controller/GetUserBalanceController";

export const GetUserBalanceModule = (): GetUserBalanceController => {
  const gateway = new GetUserBalanceGateway();
  const usecase = new GetUserBalanceUseCase(gateway);

  return new GetUserBalanceController(usecase);
};
