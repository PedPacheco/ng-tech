import { HandleTransferUseCase } from '../../core/usecase/HandleTransferUseCase';
import { HandleTransferGateway } from '../../dataprovider/gateway/HandleTransferGateway';
import { HandleTransferController } from '../../entrypoint/controller/HandleTransferController';

export const HandleTransferModule = (): HandleTransferController => {
  const gateway = new HandleTransferGateway();
  const usecase = new HandleTransferUseCase(gateway);

  return new HandleTransferController(usecase);
};
