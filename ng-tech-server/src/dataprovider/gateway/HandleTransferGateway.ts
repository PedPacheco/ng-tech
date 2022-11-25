import HandleTransferBoundary from "../../core/boundary/HandleTransferBoundary";
import HandleTransferRequest from "../../entrypoint/request/HandleTransferRequest";
import prisma from "../client/client";

export class HandleTransferGateway implements HandleTransferBoundary {
  public async execute({
    amount,
    fromUsername,
    toUsername,
  }: HandleTransferRequest) {
    const sender = await prisma.users.findUnique({
      where: {
        username: fromUsername.toLowerCase(),
      },
    });

    const recipient = await prisma.users.findUnique({
      where: {
        username: toUsername,
      },
    });

    if(!sender) {
      throw new Error("O usuário não existe");
    }

    if (!recipient) {
      throw new Error("O usuário não existe");
    }

    const transfer = await prisma.$transaction(async (tx: any) => {
      const accountSender = await tx.account.update({
        data: {
          balance: {
            decrement: amount,
          },
        },
        where: {
          id: sender.accountId,
        },
      });

      if (Number(accountSender.balance) < 0) {
        throw new Error(`Dinheiro insuficiente`);
      }

      const accountRecipient = tx.account.update({
        data: {
          balance: {
            increment: amount,
          },
        },
        where: {
          id: recipient.accountId,
        },
      });

      return accountRecipient;
    });

    if (!transfer) {
      throw new Error("Não foi possível fazer a transferência");
    }

    const addTransfer = await prisma.transactions.create({
      data: {
        creditedAccountId: recipient.accountId,
        debitedAccountId: sender.accountId,
        value: Number(amount),
        createdAt: new Date(),
      },
    });

    return addTransfer;
  }
}
