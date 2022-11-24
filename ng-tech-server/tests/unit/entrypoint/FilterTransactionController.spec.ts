import { FilterTransactionsUseCase } from "../../../src/core/usecase/FilterTransactionsUseCase";
import { FilterTransactionsByCashInGateway } from "../../../src/dataprovider/gateway/FilterTransactionsByCashInGateway";
import { FilterTransactionsByCashOutGateway } from "../../../src/dataprovider/gateway/FilterTransactionsByCashOutGateway";
import { FilterTransactionsByDateGateway } from "../../../src/dataprovider/gateway/FilterTransactionsByDateGateway";
import { FilterTransactionsController } from "../../../src/entrypoint/controller/FilterTransactionsController";

describe("FilterTransactionController", () => {
  let gatewayCashIn: FilterTransactionsByCashInGateway;
  let gatewayCashOut: FilterTransactionsByCashOutGateway;
  let gatewayDate: FilterTransactionsByDateGateway;
  let useCase: FilterTransactionsUseCase;
  let controller: FilterTransactionsController;

  beforeEach(() => {
    gatewayCashIn = new FilterTransactionsByCashInGateway();
    gatewayCashOut = new FilterTransactionsByCashOutGateway();
    gatewayDate = new FilterTransactionsByDateGateway();
    useCase = new FilterTransactionsUseCase(
      gatewayDate,
      gatewayCashIn,
      gatewayCashOut
    );
    controller = new FilterTransactionsController(useCase);
  });

  it(`Quando a chamada do controller for feita
        Então useCase deve ser chamado corretamente`, async () => {
    const spyUseCase = jest.spyOn(useCase, "execute").mockResolvedValue([]);

    const response = await controller.handle({ id: "1" }, {}, {});

    expect(spyUseCase).toHaveBeenCalledTimes(1);
    expect(spyUseCase).toHaveBeenCalledWith({ id: "1" });
    expect(response).toEqual([]);
  });
});
