import { Prisma } from '@prisma/client';

export const HandleTransferMock = {
    fromUsername: 'pedro',
    toUsername: 'joao',
    amount: 20
}

export const Transaction = {
    id: '3',
    creditedAccountId: '1',
    debitedAccountId: '2',
    value: new Prisma.Decimal(20),
    createdAt: new Date()
}