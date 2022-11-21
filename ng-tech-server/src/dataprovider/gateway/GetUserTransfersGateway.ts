import GetUserTransfersBoundary from "../../core/boundary/GetUserTransfersBoundary";
import idUserRequest from "../../entrypoint/request/IdUserRequest";
import prisma from "../client/client";

export class GetUserTransfersGateway implements GetUserTransfersBoundary {
  public async execute({ id }: idUserRequest) {
    const transactions = await prisma.transactions.findMany({
      where: {
        OR: [
          {
            debitedAccountId: id,

          },
          {
            creditedAccountId: id,
          },
        ],
      },
    });

    const users = transactions.map(async (item: any) => {
      if (item.debitedAccountId !== id) {
        const user = await prisma.users.findUnique({
          where: {
            accountId: item.debitedAccountId,
          },
        });
        return {username: user?.username, value: item.value, createdAt: item.createdAt}
      }

      if (item.creditedAccountId !== id) {
        const user = await prisma.users.findUnique({
          where: {
            accountId: item.creditedAccountId,
          },
        });
        return {username: user?.username, value: item.value, createdAt: item.createdAt}
      }
    });

    const userTransfers = await Promise.all(users);

    return userTransfers
  }
}
