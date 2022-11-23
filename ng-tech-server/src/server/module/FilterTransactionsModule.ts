import { FilterTransactionsUseCase } from '../../core/usecase/FilterTrasanctionsUseCase';
import { FilterTransactionsByCashInGateway } from '../../dataprovider/gateway/FilterTransactionsByCashInGateway';
import { FilterTransactionsByDateGateway } from '../../dataprovider/gateway/FilterTransactionsByDateGateway';
import { FilterTransactionsByCashOutGateway } from '../../dataprovider/gateway/FilterTransactionsByCashOutGateway';
import { FilterTransactionsController } from '../../entrypoint/controller/FilterTransactionsController';

export const FilterTransactionsModule = (): FilterTransactionsController => {
  const cashInGateway = new FilterTransactionsByCashInGateway();
  const cashOutGateway = new FilterTransactionsByCashOutGateway();
  const dateGateway = new FilterTransactionsByDateGateway();

  const usecase = new FilterTransactionsUseCase(dateGateway, cashInGateway, cashOutGateway,);

  return new FilterTransactionsController(usecase);
};