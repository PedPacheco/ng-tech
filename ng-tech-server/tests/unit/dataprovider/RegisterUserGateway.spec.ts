import bcrypt from "bcrypt";
import { prismaMock } from "../../../src/dataprovider/client/singleton";
import { RegisterUserGateway } from "../../../src/dataprovider/gateway/RegisterUserGateway";
import { LoginUserResponseMock } from "../../mocks/LoginUsuarioMock";

describe("RegisterUserGateway", () => {
  let gateway: RegisterUserGateway;

  beforeEach(() => {
    gateway = new RegisterUserGateway();
  });

  it(`Quando for feita a chamada do gateway
        Então os cinemas deve ser retornados corretamente`, async () => {
    prismaMock.users.create.mockResolvedValue(LoginUserResponseMock);

    const response = await gateway.execute({username: "pedro", password: "Pedro123"});

    expect(response).toEqual(expect.anything());
  });
});
