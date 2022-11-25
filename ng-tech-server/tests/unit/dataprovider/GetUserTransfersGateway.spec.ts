import { prismaMock } from "../../../src/dataprovider/client/singleton";
import {
  ResponseTransaction,
  userAccountId1Mock,
  userAccountId2Mock,
} from "../../mocks/GetUserTransfersMock";
import { GetUserTransfersGateway } from "./../../../src/dataprovider/gateway/GetUserTransfersGateway";

describe("GetUserTransfersGateway", () => {
  let gateway: GetUserTransfersGateway;

  beforeEach(() => {
    gateway = new GetUserTransfersGateway();
  });

  it(`Quando for feita a chamada do gateway
        Então as transferências do usuário devem ser retornadas corretamente`, async () => {
    prismaMock.transactions.findMany.mockResolvedValue([ResponseTransaction]);
    prismaMock.users.findUnique.mockResolvedValue(userAccountId2Mock);

    const response = await gateway.execute({ id: "2" });

    expect(response).toEqual([
      {
        id: "1",
        debitedUsername: "pedro",
        creditedUsername: "pedro",
        value: 20,
        createdAt: "22-05-17",
      },
    ]);
  });

  it(`Quando for feita a chamada do gateway
  Então as transferências do usuário devem ser retornadas corretamente`, async () => {
    prismaMock.transactions.findMany.mockResolvedValue([ResponseTransaction]);
    prismaMock.users.findUnique.mockResolvedValue(userAccountId1Mock);

    const response = await gateway.execute({ id: "1" });
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
