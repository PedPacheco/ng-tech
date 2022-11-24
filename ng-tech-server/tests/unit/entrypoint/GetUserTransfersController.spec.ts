import { GetUserTransfersUseCase } from "../../../src/core/usecase/GetUserTransfersUseCase";
import { GetUserTransfersGateway } from "../../../src/dataprovider/gateway/GetUserTransfersGateway";
import { GetUserTransfersController } from "../../../src/entrypoint/controller/GetUserTransfersController";

describe("GetUserTransferController", () => {
  let gateway: GetUserTransfersGateway;
  let useCase: GetUserTransfersUseCase;
  let controller: GetUserTransfersController;

  beforeEach(() => {
    gateway = new GetUserTransfersGateway();
    useCase = new GetUserTransfersUseCase(gateway);
    controller = new GetUserTransfersController(useCase);
  });

  it(`Quando a chamada do controller for feita
        Então useCase deve ser chamado corretamente`, async () => {
    const spyUseCase = jest.spyOn(useCase, "execute").mockResolvedValue([
      {
        id: "1",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 20,
        createdAt: "17/05/2003",
      },
    ]);

    const response = await controller.handle({ id: "1" }, {}, {});

    expect(spyUseCase).toHaveBeenCalledTimes(1);
    expect(spyUseCase).toHaveBeenCalledWith({ id: "1" });
    expect(response).toEqual([
      {
        id: "1",
        debitedUsername: "joao",
        creditedUsername: "joao",
        value: 20,
        createdAt: "17/05/2003",
      },
    ]);
  });
});
