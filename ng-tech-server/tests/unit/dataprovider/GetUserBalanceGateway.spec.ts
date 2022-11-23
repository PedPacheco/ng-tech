import { prismaMock } from "../../../src/dataprovider/client/singleton";
import { GetUserBalanceGateway } from "../../../src/dataprovider/gateway/GetUserBalanceGateway";
import GetUserBalanceMock from '../../mocks/GetUserBalanceMock'

describe("GetUserBalanceGateway", () => {
  let gateway: GetUserBalanceGateway;

  beforeEach(() => {
    gateway = new GetUserBalanceGateway();
  });

  it(`Quando for feita a chamada do gateway
        Então os cinemas deve ser retornados corretamente`, async () => {
    const spyPrisma = jest
      .spyOn(prismaMock.account, "findUnique")
      .mockResolvedValue(GetUserBalanceMock);

    const response = await gateway.execute(GetUserBalanceMock);

    expect(spyPrisma).toHaveBeenCalledTimes(1);
    expect(spyPrisma).toHaveBeenCalledWith({
        where: {
          id: '1',
        },
      });
    expect(response).toEqual(GetUserBalanceMock)
  });
});
