import { prismaMock } from "../../../src/dataprovider/client/singleton";
import { HandleTransferGateway } from "../../../src/dataprovider/gateway/HandleTransferGateway";
import { userAccountId1Mock } from "../../mocks/GetUserTransfersMock";
import { HandleTransferMock, Transaction } from "../../mocks/HandleTransferMock";

describe("HandleTransferGateway", () => {
  let gateway: HandleTransferGateway;

  beforeEach(() => {
    gateway = new HandleTransferGateway();
  });

  it(`Quando for feita a chamada do gateway
        Então os cinemas deve ser retornados corretamente`, async () => {
    prismaMock.users.findUnique.mockResolvedValue(userAccountId1Mock)
    prismaMock.$transaction.mockResolvedValue(true)
    prismaMock.account.update.mockResolvedValue({id: '1', balance: 100})


    const response = await gateway.execute(HandleTransferMock);

    expect(response).toEqual(Transaction);
  });
});
