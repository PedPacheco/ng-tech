import jwt from 'jsonwebtoken';
import RegisterUserBoundary from "../../core/boundary/RegisterUserBoundary";
import UsuarioRequest from "../../entrypoint/request/UsuarioRequest";
import prisma from "../client/client";

export class RegisterUserGateway implements RegisterUserBoundary {
  public async execute({ password, username }: UsuarioRequest) {
    const user = await prisma.users.create({
      data: {
        username: username.toLowerCase(),
        password,
        account: {
          create: {
            balance: 100.00,
          },
        },
      },
    });

    const token = jwt.sign(
      {
        username,
        userId: user.id,
      },
      "token",
      { expiresIn: "24h" }
    );

    return { user, token };
  }
}
