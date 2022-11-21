import { GetUserTransfersUseCase } from '../../core/usecase/GetUserTransfersUseCase';
import { GetUserTransfersGateway } from '../../dataprovider/gateway/GetUserTransfersGateway';
import { GetUserTransfersController } from '../../entrypoint/controller/GetUserTransfersController';

export const GetUserTransfersModule = (): GetUserTransfersController => {
  const gateway = new GetUserTransfersGateway();
  const usecase = new GetUserTransfersUseCase(gateway);

  return new GetUserTransfersController(usecase);
};
