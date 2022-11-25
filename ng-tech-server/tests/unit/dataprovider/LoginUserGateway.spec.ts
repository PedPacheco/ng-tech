import bcrypt from "bcrypt";
import { prismaMock } from "../../../src/dataprovider/client/singleton";
import { LoginUsuarioGateway } from "../../../src/dataprovider/gateway/LoginUsuarioGateway";
import {
  LoginUserRequestMock,
  LoginUserResponseMock,
} from "../../mocks/LoginUsuarioMock";

describe("LoginUsuarioGateway", () => {
  let gateway: LoginUsuarioGateway;

  beforeEach(() => {
    gateway = new LoginUsuarioGateway();
  });

  it(`Quando for feita a chamada do gateway
        Então o usario deve ser retornados corretamente`, async () => {
    prismaMock.users.findUnique.mockResolvedValue(LoginUserResponseMock);

    const bcryptCompare = jest.fn().mockResolvedValue(true);
    (bcrypt.compareSync as jest.Mock) = bcryptCompare;

    const response = await gateway.execute(LoginUserRequestMock);

    expect(response).toEqual(expect.anything());
  });

  it(`Quando for feita a chamada do gateway e a senha for incorreta
  Então um erro deve ser disparado corretamente`, async () => {
    prismaMock.users.findUnique.mockResolvedValue(LoginUserResponseMock);

    try {
      await gateway.execute({username: "pedro", password: "fsdfdsg"});
    } catch (e) {
      expect(e).toMatch("Senha incorreta");
    }
  });
});
