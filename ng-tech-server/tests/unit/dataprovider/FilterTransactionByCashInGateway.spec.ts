import { prismaMock } from "../../../src/dataprovider/client/singleton";
import { FilterTransactionsByCashInGateway } from "../../../src/dataprovider/gateway/FilterTransactionsByCashInGateway";
import { cashInTransactionsResponse } from "../../mocks/FilterTransactionsMock";
import { userAccountId1Mock } from "../../mocks/GetUserTransfersMock";

describe("FilterTransactionsByCashInGateway", () => {
  let gateway: FilterTransactionsByCashInGateway;

  beforeEach(() => {
    gateway = new FilterTransactionsByCashInGateway();
  });

  it(`Quando for feita a chamada do gateway
        Então as transferências do usuário devem ser retornadas corretamente`, async () => {
    prismaMock.transactions.findMany.mockResolvedValue(
      cashInTransactionsResponse
    );
    prismaMock.users.findUnique.mockResolvedValue(userAccountId1Mock);

    const response = await gateway.execute({ id: "1" });

    expect(response).toEqual([
      {
        createdAt: "22-05-17",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 20,
        id: "1",
      },
    ]);
  });
});
