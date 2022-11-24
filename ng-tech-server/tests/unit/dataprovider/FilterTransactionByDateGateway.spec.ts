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

    const response = await gateway.execute({ id: "1", date: "21-07-2022" });

    expect(response).toEqual([
      {
        createdAt: "21/07/2022",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 242,
        id: "3",
      },
    ]);
  });

  it(`Quando for feita a chamada do gateway
  Então as transferências do usuário devem ser retornadas corretamente`, async () => {
    prismaMock.transactions.findMany.mockResolvedValue(
      dateTransactionsResponse
    );
    prismaMock.users.findUnique.mockResolvedValue(userAccountId1Mock);

    const response = await gateway.execute({ id: "1", date: "17-05-2021" });

    expect(response).toEqual([
      {
        createdAt: "17/05/2021",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 68,
        id: "2",
      },
      {
        createdAt: "17/05/2021",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 20,
        id: "1",
      },
    ]);
  });
});
