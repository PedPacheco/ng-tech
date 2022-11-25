import FilterTransactionsByCashInBoundary from "../../core/boundary/FilterTransactionsByCashInBoundary";
import {
  Transactions,
  TransactionsResponse,
} from "../../core/models/Transactions.model";
import FilterTransactions from "../../entrypoint/request/FilterTransactionRequest";
import prisma from "../client/client";

export class FilterTransactionsByCashInGateway
  implements FilterTransactionsByCashInBoundary
{
  public async execute({
    id,
  }: FilterTransactions): Promise<(TransactionsResponse | undefined)[]> {
    const transactions = await prisma.transactions.findMany({
      where: {
        creditedAccountId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const users = transactions.map(
      async (item: any): Promise<TransactionsResponse> => {
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
    );

    const userTransfers = await Promise.all(users);

    return userTransfers;
  }
}
