import GetUserBalanceBoundary from "../../core/boundary/GetUserBalanceBoundary";
import idUserRequest from "../../entrypoint/request/IdUserRequest";
import prisma from "../client/client";

export class GetUserBalanceGateway implements GetUserBalanceBoundary {
  public async execute({ id }: idUserRequest) {
    const balance = await prisma.account.findUnique({
      where: {
        id,
      },
    });

    return balance;
  }
}
