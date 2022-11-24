import { RegisterUserUseCase } from "../../../src/core/usecase/RegisterUserUseCase";
import { RegisterUserGateway } from "../../../src/dataprovider/gateway/RegisterUserGateway";
import { RegisterUserController } from "../../../src/entrypoint/controller/RegisterUserController";
import {
  LoginUserRequestMock,
  LoginUserResponseMock,
} from "../../mocks/LoginUsuarioMock";

describe("RegisterUserController", () => {
  let gateway: RegisterUserGateway;
  let useCase: RegisterUserUseCase;
  let controller: RegisterUserController;

  beforeEach(() => {
    gateway = new RegisterUserGateway();
    useCase = new RegisterUserUseCase(gateway);
    controller = new RegisterUserController(useCase);
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
