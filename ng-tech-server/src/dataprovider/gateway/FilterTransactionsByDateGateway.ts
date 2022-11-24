
import FilterTransactionsByDateBoundary from "../../core/boundary/FilterTransactionsByDateBoundary";
import FilterTransactionsRequest from "../../entrypoint/request/FilterTransactionRequest";
import prisma from "../client/client";

export class FilterTransactionsByDateGateway
  implements FilterTransactionsByDateBoundary
{
  public async execute({ id, date }: FilterTransactionsRequest) {
    if (date) {
      const filterDate = new Date(date);

      const transactions = await prisma.transactions.findMany({
        where: {
          createdAt: filterDate,
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
}
