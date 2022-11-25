import { prismaMock } from "../../../src/dataprovider/client/singleton";
import { FilterTransactionsByDateGateway } from "../../../src/dataprovider/gateway/FilterTransactionsByDateGateway";
import { dateTransactionsResponse } from "../../mocks/FilterTransactionsMock";
import { userAccountId1Mock } from "../../mocks/GetUserTransfersMock";

describe("FilterTransactionsByDateGateway", () => {
  let gateway: FilterTransactionsByDateGateway;

  beforeEach(() => {
    gateway = new FilterTransactionsByDateGateway();
  });

  it(`Quando for feita a chamada do gateway
  Então as transferências do usuário devem ser retornadas corretamente`, async () => {
    prismaMock.transactions.findMany.mockResolvedValue(
      dateTransactionsResponse
    );
    prismaMock.users.findUnique.mockResolvedValue(userAccountId1Mock);

    const response = await gateway.execute({ id: "1", date: "2021-05-17" });

    expect(response).toEqual([
      {
        createdAt: "22-05-17",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 20,
        id: "1",
      },
      {
        createdAt: "22-05-17",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 68,
        id: "2",
      },
    ]);
  });

  it(`Quando for feita a chamada do gateway sem a data
  Então deve ser retornado undefined`, async () => {
    prismaMock.transactions.findMany.mockResolvedValue(
      dateTransactionsResponse
    );
    prismaMock.users.findUnique.mockResolvedValue(userAccountId1Mock);

    const response = await gateway.execute({ id: "1", date: "" });

    expect(response).toBeUndefined()
  });
});
