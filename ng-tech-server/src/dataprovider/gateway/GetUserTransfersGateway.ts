import GetUserTransfersBoundary from "../../core/boundary/GetUserTransfersBoundary";
import { TransactionsResponse } from "../../core/models/Transactions.model";
import idUserRequest from "../../entrypoint/request/IdUserRequest";
import prisma from "../client/client";

export class GetUserTransfersGateway implements GetUserTransfersBoundary {
  public async execute({ id }: idUserRequest): Promise<(TransactionsResponse | undefined)[]>  {
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
      orderBy: {
        createdAt: "desc",
      },
    });

    const users = transactions.map(async (item: any) => {
      if (item.debitedAccountId !== id) {
        const debitedUser = await prisma.users.findUnique({
          where: {
            accountId: item.debitedAccountId,
          },
        });
        const creditedUser = await prisma.users.findUnique({
          where: {
            accountId: id,
          },
        });
        return {
          id: item.id,
          debitedUsername: debitedUser?.username,
          creditedUsername: creditedUser?.username,
          value: item.value,
          createdAt: item.createdAt,
        };
      }

      if (item.creditedAccountId !== id) {
        const creditedUser = await prisma.users.findUnique({
          where: {
            accountId: item.creditedAccountId,
          },
        });
        const debitedUser = await prisma.users.findUnique({
          where: {
            accountId: id,
          },
        });
        return {
          id: item.id,
          debitedUsername: debitedUser?.username,
          creditedUsername: creditedUser?.username,
          value: item.value,
          createdAt: item.createdAt,
        };
      }
    });

    const userTransfers = await Promise.all(users);

    return userTransfers;
  }
}
