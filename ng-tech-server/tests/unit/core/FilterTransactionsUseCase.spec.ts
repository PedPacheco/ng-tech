import FilterTransactionsByCashOutBoundary from "../../../src/core/boundary/FilterTransactionsByCashOutBoundary";
import FilterTransactionsByCashInBoundary from "../../../src/core/boundary/FilterTransactionsByCashOutBoundary";
import FilterTransactionsByDateBoundary from "../../../src/core/boundary/FilterTransactionsByDateBoundary";
import { FilterTransactionsUseCase } from "../../../src/core/usecase/FilterTransactionsUseCase";
import { FilterTransactionsByCashInGateway } from "../../../src/dataprovider/gateway/FilterTransactionsByCashInGateway";
import { FilterTransactionsByCashOutGateway } from "../../../src/dataprovider/gateway/FilterTransactionsByCashOutGateway";
import { FilterTransactionsByDateGateway } from "../../../src/dataprovider/gateway/FilterTransactionsByDateGateway";

describe("FilterTransactionsUseCase", () => {
  let gatewayCashIn: FilterTransactionsByCashInBoundary;
  let gatewayCashOut: FilterTransactionsByCashOutBoundary;
  let gatewayDate: FilterTransactionsByDateBoundary;
  let useCase: FilterTransactionsUseCase;

  beforeEach(() => {
    gatewayDate = new FilterTransactionsByDateGateway();
    gatewayCashIn = new FilterTransactionsByCashInGateway();
    gatewayCashOut = new FilterTransactionsByCashOutGateway();
    useCase = new FilterTransactionsUseCase(
      gatewayDate,
      gatewayCashIn,
      gatewayCashOut,

    );
  });

  it(`Quando for feita a chamada do useCase
        Então o gatewayCashIn deve ser chamado corretamente`, async () => {
    const spyGateway = jest.spyOn(gatewayCashIn, "execute").mockResolvedValue([
      {
        id: "1",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 20,
        createdAt: "22-05-17",
      },
    ]);

    const response = await useCase.execute({
      id: "1",
      filter: "transacoes-cash-in",
    });

    expect(spyGateway).toHaveBeenCalledTimes(1);
    expect(spyGateway).toHaveBeenCalledWith({ id: "1" });
    expect(response).toEqual([
      {
        id: "1",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 20,
        createdAt: "22-05-17",
      },
    ]);
  });

  it(`Quando for feita a chamada do useCase
  Então o gatewayDate deve ser chamado corretamente`, async () => {
    const spyGateway = jest.spyOn(gatewayDate, "execute").mockResolvedValue([
      {
        id: "1",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 20,
        createdAt: "22-05-17",
      },
    ]);

    const response = await useCase.execute({
      id: "1",
      filter: "transacoes-data",
      date: "2022-05-17",
    });

    expect(spyGateway).toHaveBeenCalledTimes(1);
    expect(spyGateway).toHaveBeenCalledWith({ id: "1", date: "2022-05-17" });
    expect(response).toEqual([
      {
        id: "1",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 20,
        createdAt: "22-05-17",
      },
    ]);
  });

  it(`Quando for feita a chamada do useCase
Então o gatewayCashOut deve ser chamado corretamente`, async () => {
    const spyGateway = jest.spyOn(gatewayCashOut, "execute").mockResolvedValue([
      {
        id: "1",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 20,
        createdAt: "22-05-17",
      },
    ]);

    const response = await useCase.execute({
      id: "1",
      filter: "transacoes-cash-out",
    });

    expect(spyGateway).toHaveBeenCalledTimes(1);
    expect(spyGateway).toHaveBeenCalledWith({ id: "1" });
    expect(response).toEqual([
      {
        id: "1",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 20,
        createdAt: "22-05-17",
      },
    ]);
  });
});
