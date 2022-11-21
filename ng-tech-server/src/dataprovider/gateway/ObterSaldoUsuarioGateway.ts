import ObterSaldoUsuarioBoundary from "../../core/boundary/ObterSaldoUsuarioBoundary";
import idUserRequest from "../../entrypoint/request/IdUserRequest";
import prisma from "../client/client";

export class ObterSaldoUsuarioGateway implements ObterSaldoUsuarioBoundary {
  public async execute({ id }: idUserRequest) {
    const balance = await prisma.account.findUnique({
      where: {
        id,
      },
    });

    return balance;
  }
}
