import { LoginUsuarioUseCase } from "../../../src/core/usecase/LoginUsuarioUseCase";
import { LoginUsuarioGateway } from "../../../src/dataprovider/gateway/LoginUsuarioGateway";
import { LoginUsuarioController } from "../../../src/entrypoint/controller/LoginUsuarioController";
import {
  LoginUserRequestMock,
  LoginUserResponseMock,
} from "../../mocks/LoginUsuarioMock";

describe("LoginUsuarioController", () => {
  let gateway: LoginUsuarioGateway;
  let useCase: LoginUsuarioUseCase;
  let controller: LoginUsuarioController;

  beforeEach(() => {
    gateway = new LoginUsuarioGateway();
    useCase = new LoginUsuarioUseCase(gateway);
    controller = new LoginUsuarioController(useCase);
  });

  it(`Quando a chamada do controller for feita
        Então useCase deve ser chamado corretamente`, async () => {
    const spyUseCase = jest
      .spyOn(useCase, "execute")
      .mockResolvedValue({ user: LoginUserResponseMock, token: "token" });

    const response = await controller.handle({}, {}, LoginUserRequestMock);

    expect(spyUseCase).toHaveBeenCalledTimes(1);
    expect(spyUseCase).toHaveBeenCalledWith(LoginUserRequestMock);
    expect(response).toEqual({ user: LoginUserResponseMock, token: "token" });
  });
});
