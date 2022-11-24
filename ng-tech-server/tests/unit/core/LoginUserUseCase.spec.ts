import { LoginUsuarioUseCase } from "../../../src/core/usecase/LoginUsuarioUseCase";
import { LoginUsuarioGateway } from "../../../src/dataprovider/gateway/LoginUsuarioGateway";
import {
  LoginUserRequestMock,
  LoginUserResponseMock,
} from "../../mocks/LoginUsuarioMock";

describe("LoginUsuarioUseCase", () => {
  let gateway: LoginUsuarioGateway;
  let useCase: LoginUsuarioUseCase;

  beforeEach(() => {
    gateway = new LoginUsuarioGateway();
    useCase = new LoginUsuarioUseCase(gateway);
  });

  it(`Quando for feita a chamada do useCase
        Então o gateway deve ser chamado corretamente`, async () => {
    const spyGateway = jest
      .spyOn(gateway, "execute")
      .mockResolvedValue({ user: LoginUserResponseMock, token: "token" });

    const response = await useCase.execute(LoginUserRequestMock);

    expect(spyGateway).toHaveBeenCalledTimes(1);
    expect(spyGateway).toHaveBeenCalledWith(LoginUserRequestMock);
    expect(response).toEqual({ user: LoginUserResponseMock, token: "token" });
  });
});
