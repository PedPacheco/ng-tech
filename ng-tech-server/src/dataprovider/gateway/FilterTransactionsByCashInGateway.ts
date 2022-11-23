import FilterTransactionsByCashInBoundary from "../../core/boundary/FilterTransactionsByCashInBoundary";
import FilterTransactions from "../../entrypoint/request/FilterTransactionRequest";
import prisma from "../client/client";

export class FilterTransactionsByCashInGateway
  implements FilterTransactionsByCashInBoundary
{
  public async execute({ id }: FilterTransactions) {
    console.log(id)
    const transactions = await prisma.transactions.findMany({
      where: {
        debitedAccountId: id,
      },
      orderBy: {
        id: "desc",
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
