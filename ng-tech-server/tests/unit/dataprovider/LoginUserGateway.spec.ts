import { prismaMock } from "../../../src/dataprovider/client/singleton";
import { LoginUsuarioGateway } from "../../../src/dataprovider/gateway/LoginUsuarioGateway";
import {
  LoginUserRequestMock,
  LoginUserResponseMock,
} from "../../mocks/LoginUsuarioMock";
import bcrypt from "bcrypt";

describe("LoginUsuarioGateway", () => {
  let gateway: LoginUsuarioGateway;

  beforeEach(() => {
    gateway = new LoginUsuarioGateway();
  });

  it(`Quando for feita a chamada do gateway
        Então os cinemas deve ser retornados corretamente`, async () => {
    const spyPrisma = jest
      .spyOn(prismaMock.users, "findUnique")
      .mockResolvedValue(LoginUserResponseMock);
  
    const bcryptCompare = jest.fn().mockResolvedValue(true);
    (bcrypt.compareSync as jest.Mock) = bcryptCompare;

    const response = await gateway.execute(LoginUserRequestMock);

    expect(spyPrisma).toHaveBeenCalledTimes(1);
    expect(spyPrisma).toHaveBeenCalledWith({
      where: {
        username: LoginUserRequestMock.username,
      },
    });
    expect(response).toEqual(expect.anything())
  });
});
