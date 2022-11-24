import { prismaMock } from "../../../src/dataprovider/client/singleton";
import { FilterTransactionsByCashOutGateway } from "../../../src/dataprovider/gateway/FilterTransactionsByCashOutGateway";
import { cashOutTransactionsResponse } from "../../mocks/FilterTransactionsMock";
import { userAccountId2Mock } from "../../mocks/GetUserTransfersMock";

describe("FilterTransactionsByCashOutGateway", () => {
  let gateway: FilterTransactionsByCashOutGateway;

  beforeEach(() => {
    gateway = new FilterTransactionsByCashOutGateway();
  });

  it(`Quando for feita a chamada do gateway
        Então as transferências do usuário devem ser retornadas corretamente`, async () => {
    prismaMock.transactions.findMany.mockResolvedValue(
      cashOutTransactionsResponse
    );
    prismaMock.users.findUnique.mockResolvedValue(userAccountId2Mock);

    const response = await gateway.execute({ id: "2" });

    expect(response).toEqual([
      {
        createdAt: "21/07/2022",
        debitedUsername: "pedro",
        creditedUsername: "pedro",
        id: "3",
        value: 242,
      },
      {
        createdAt: "17/05/2021",
        debitedUsername: "pedro",
        creditedUsername: "pedro",
        id: "2",
        value: 68,
      },
    ]);
  });
});
