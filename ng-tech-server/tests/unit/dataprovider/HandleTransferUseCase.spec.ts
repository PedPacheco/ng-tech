import { Prisma } from "@prisma/client";
import { prismaMock } from "../../../src/dataprovider/client/singleton";
import { HandleTransferGateway } from "../../../src/dataprovider/gateway/HandleTransferGateway";
import { userAccountId1Mock } from "../../mocks/GetUserTransfersMock";
import {
  HandleTransferMock,
  Transaction,
} from "../../mocks/HandleTransferMock";

describe("HandleTransferGateway", () => {
  let gateway: HandleTransferGateway;

  beforeEach(() => {
    gateway = new HandleTransferGateway();
  });

  it(`Quando for feita a chamada do gateway
        Então a transferencia deve ser retornada corretamente`, async () => {
    prismaMock.users.findUnique.mockResolvedValue(userAccountId1Mock);
    prismaMock.$transaction.mockResolvedValue(true);
    prismaMock.account.update.mockResolvedValue({ id: "1", balance: 100 });
    prismaMock.transactions.create.mockResolvedValue({
      id: "3",
      creditedAccountId: "1",
      debitedAccountId: "2",
      value: new Prisma.Decimal(20),
      createdAt: new Date("2022/05/17"),
    });

    const response = await gateway.execute({
      fromUsername: "pedro",
      toUsername: "joao",
      amount: 20,
    });

    expect(response).toEqual(Transaction);
  });
});
