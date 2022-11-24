import { FilterTransactionsUseCase } from "../../core/usecase/FilterTransactionsUseCase";
import { FilterTransactionsByCashInGateway } from "../../dataprovider/gateway/FilterTransactionsByCashInGateway";
import { FilterTransactionsByCashOutGateway } from "../../dataprovider/gateway/FilterTransactionsByCashOutGateway";
import { FilterTransactionsByDateGateway } from "../../dataprovider/gateway/FilterTransactionsByDateGateway";
import { FilterTransactionsController } from "../../entrypoint/controller/FilterTransactionsController";

export const FilterTransactionsModule = (): FilterTransactionsController => {
  const cashInGateway = new FilterTransactionsByCashInGateway();
  const cashOutGateway = new FilterTransactionsByCashOutGateway();
  const dateGateway = new FilterTransactionsByDateGateway();

  const usecase = new FilterTransactionsUseCase(
    dateGateway,
    cashInGateway,
    cashOutGateway
  );

  return new FilterTransactionsController(usecase);
};
