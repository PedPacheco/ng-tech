import { GetUserTransfersGateway } from "./../../../src/dataprovider/gateway/GetUserTransfersGateway";
import {
  Transaction,
  userAccountId2Mock,
  userAccountId1Mock,
} from "../../mocks/GetUserTransfersMock";
import { prismaMock } from "../../../src/dataprovider/client/singleton";

describe("GetUserTransfersGateway", () => {
  let gateway: GetUserTransfersGateway;

  beforeEach(() => {
    gateway = new GetUserTransfersGateway();
  });

  it(`Quando for feita a chamada do gateway
        Então as transferências do usuário devem ser retornadas corretamente`, async () => {
    const spyPrismaFindMany = jest
      .spyOn(prismaMock.transactions, "findMany")
      .mockResolvedValue([Transaction]);

    const spyPrismaAccountId2 = jest
      .spyOn(prismaMock.users, "findUnique")
      .mockResolvedValue(userAccountId2Mock);

    const SenderUser = await gateway.execute({ id: "1" });

    expect(spyPrismaFindMany).toHaveBeenCalledTimes(1);
    expect(spyPrismaFindMany).toHaveBeenCalledWith({
      where: {
        OR: [
          {
            debitedAccountId: "1",
          },
          {
            creditedAccountId: "1",
          },
        ],
      },
      orderBy: {
        id: "desc",
      },
    });
    expect(SenderUser).toEqual([
      {
        id: "1",
        debitedUsername: "pedro",
        creditedUsername: "pedro",
        value: "20",
        createdAt: "17/05/2003",
      },
    ]);
    expect(spyPrismaAccountId2).toHaveBeenCalledWith({
      where: { accountId: "2" },
    });
    expect(spyPrismaAccountId2).toHaveBeenCalledWith({
      where: { accountId: "1" },
    });
  });
});
