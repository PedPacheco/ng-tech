import { FilterTransactionsUseCase } from "../../../src/core/usecase/FilterTransactionsUseCase";
import { FilterTransactionsByCashInGateway } from "../../../src/dataprovider/gateway/FilterTransactionsByCashInGateway";
import { FilterTransactionsByCashOutGateway } from "../../../src/dataprovider/gateway/FilterTransactionsByCashOutGateway";
import { FilterTransactionsByDateGateway } from "../../../src/dataprovider/gateway/FilterTransactionsByDateGateway";

describe("FilterTransactionsUseCase", () => {
  let gatewayCashIn: FilterTransactionsByCashInGateway;
  let gatewayCashOut: FilterTransactionsByCashOutGateway;
  let gatewayDate: FilterTransactionsByDateGateway;
  let useCase: FilterTransactionsUseCase;

  beforeEach(() => {
    gatewayCashIn = new FilterTransactionsByCashInGateway();
    gatewayCashOut = new FilterTransactionsByCashOutGateway();
    gatewayDate = new FilterTransactionsByDateGateway();
    useCase = new FilterTransactionsUseCase(
      gatewayCashIn,
      gatewayCashOut,
      gatewayDate
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
        createdAt: "17/05/2003",
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
        createdAt: "17/05/2003",
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
        createdAt: "17/05/2022",
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
        createdAt: "17/05/2003",
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
        createdAt: "17/05/2003",
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
        createdAt: "17/05/2003",
      },
    ]);
  });
});
