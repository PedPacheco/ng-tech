import { HandleTransferUseCase } from "../../../src/core/usecase/HandleTransferUseCase";
import { HandleTransferGateway } from "../../../src/dataprovider/gateway/HandleTransferGateway";
import {
  HandleTransferMock,
  Transaction,
} from "../../mocks/HandleTransferMock";

describe("HandleTransferUseCase", () => {
  let gateway: HandleTransferGateway;
  let useCase: HandleTransferUseCase;

  beforeEach(() => {
    gateway = new HandleTransferGateway();
    useCase = new HandleTransferUseCase(gateway);
  });

  test(`Quando for feita a chamada do useCase
        Então o gateway deve ser chamado corretamente`, async () => {
    const spyGateway = jest
      .spyOn(gateway, "execute")
      .mockResolvedValue(Transaction);

    const response = await useCase.execute(HandleTransferMock);

    expect(spyGateway).toHaveBeenCalledTimes(1);
    expect(spyGateway).toHaveBeenCalledWith(HandleTransferMock);
    expect(response).toEqual(Transaction);
  });
});
