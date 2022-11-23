import FilterTransactionsBoundary from "../../core/boundary/FilterTransactionsBoundary";
import FilterTransactions from "../../entrypoint/request/FilterTransactionRequest";
import prisma from "../client/client";

export class FilterTransactionsGateway implements FilterTransactionsBoundary {
  public async execute({ id, filter, date }: FilterTransactions) {
    const filterDate = new Date(date);

    if (filter === "transacoes-cash-out") {
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

    if (filter === "transacoes-cash-in") {
      const transactions = await prisma.transactions.findMany({
        where: {
          creditedAccountId: id,
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

    if (filter === "transacoes-data") {
      const transactions = await prisma.transactions.findMany({
        where: {
          createdAt: filterDate,
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
}
