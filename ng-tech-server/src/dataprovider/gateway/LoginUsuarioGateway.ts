import bcrypt from "bcrypt";
import LoginUsuarioBoundary from "../../core/boundary/LoginUsuarioBoundary";
import UsuarioRequest from "../../entrypoint/request/UsuarioRequest";
import prisma from "../client/client";
import jwt from "jsonwebtoken";

export class LoginUsuarioGateway implements LoginUsuarioBoundary {
  public async execute({ username, password }: UsuarioRequest) {
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new Error("Usuario não registrado");
    }

    const checkPassword = bcrypt.compareSync(password, user?.password);
    if (!checkPassword) throw new Error("Senha incorreta");

    const token = jwt.sign(
      {
        username,
        userId: user.id,
      },
      "token",
      { expiresIn: 60 * 60 * 24 }
    );

    return { user, token };
  }
}
