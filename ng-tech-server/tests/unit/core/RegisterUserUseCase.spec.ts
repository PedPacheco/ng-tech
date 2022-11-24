import bcrypt from "bcrypt";
import { RegisterUserUseCase } from "../../../src/core/usecase/RegisterUserUseCase";
import { RegisterUserGateway } from "../../../src/dataprovider/gateway/RegisterUserGateway";
import { LoginUserResponseMock } from "../../mocks/LoginUsuarioMock";
import { LoginUserRequestMock } from "./../../mocks/LoginUsuarioMock";

describe("RegisterUserUseCase", () => {
  let gateway: RegisterUserGateway;
  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    gateway = new RegisterUserGateway();
    useCase = new RegisterUserUseCase(gateway);
  });

  it(`Quando for feita a chamada do useCase
        Então o gateway deve ser chamado corretamente`, async () => {
    const spyGateway = jest
      .spyOn(gateway, "execute")
      .mockResolvedValue({ user: LoginUserResponseMock, token: "token" });

    jest.spyOn(bcrypt, "hashSync").mockImplementation(() => "Pedro123");

    const response = await useCase.execute(LoginUserRequestMock);

    expect(spyGateway).toHaveBeenCalledTimes(1);
    expect(spyGateway).toHaveBeenCalledWith(LoginUserRequestMock);
    expect(response).toEqual({ user: LoginUserResponseMock, token: "token" });
  });
});
