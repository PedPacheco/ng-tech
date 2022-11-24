import { prismaMock } from "../../../src/dataprovider/client/singleton";
import { HandleTransferGateway } from "../../../src/dataprovider/gateway/HandleTransferGateway";
import { HandleTransferMock } from "../../mocks/HandleTransferMock";

describe("HandleTransferGateway", () => {
  let gateway: HandleTransferGateway;

  beforeEach(() => {
    gateway = new HandleTransferGateway();
  });

  it(`Quando for feita a chamada do gateway
        Então os cinemas deve ser retornados corretamente`, async () => {
    const spyPrisma = jest
      .spyOn(prismaMock.account, "findUnique")
      .mockResolvedValue(HandleTransferMock.fromUsername);

    const response = await gateway.execute(HandleTransferMock);

    expect(spyPrisma).toHaveBeenCalledTimes(1);
    expect(spyPrisma).toHaveBeenCalledWith({
      where: {
        id: "1",
      },
    });
    expect(response).toEqual(HandleTransferMock);
  });
});
