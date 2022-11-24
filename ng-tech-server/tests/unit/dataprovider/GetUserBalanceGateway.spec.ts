import { prismaMock } from "../../../src/dataprovider/client/singleton";
import { GetUserBalanceGateway } from "../../../src/dataprovider/gateway/GetUserBalanceGateway";
import GetUserBalanceMock from "../../mocks/GetUserBalanceMock";

describe("GetUserBalanceGateway", () => {
  let gateway: GetUserBalanceGateway;

  beforeEach(() => {
    gateway = new GetUserBalanceGateway();
  });

  it(`Quando for feita a chamada do gateway
        Então os cinemas deve ser retornados corretamente`, async () => {
    prismaMock.account.findUnique.mockResolvedValue(GetUserBalanceMock);

    const response = await gateway.execute(GetUserBalanceMock);

    expect(response).toEqual(GetUserBalanceMock);
  });
});
