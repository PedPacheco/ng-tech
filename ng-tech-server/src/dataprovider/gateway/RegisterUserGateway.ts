import RegisterUserBoundary from "../../core/boundary/RegisterUserBoundary";
import UsuarioRequest from "../../entrypoint/request/UsuarioRequest";
import prisma from "../client/client";

export class RegisterUserGateway implements RegisterUserBoundary {
  public async execute({ password, username }: UsuarioRequest) {
    const user = await prisma.users.create({
      data: {
        username,
        password,
        account: {
          create: {
            balance: 100,
          },
        },
      },
    });

    return user;
  }
}
