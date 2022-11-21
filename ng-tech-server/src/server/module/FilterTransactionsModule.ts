import { FilterTransactionsUseCase } from '../../core/usecase/FilterTrasanctionsUseCase';
import { FilterTransactionsGateway } from '../../dataprovider/gateway/FilterTransactionsGateway';
import { FilterTransactionsController } from '../../entrypoint/controller/FilterTransactionsController';

export const FilterTransactionsModule = (): FilterTransactionsController => {
  const gateway = new FilterTransactionsGateway();
  const usecase = new FilterTransactionsUseCase(gateway);

  return new FilterTransactionsController(usecase);
};