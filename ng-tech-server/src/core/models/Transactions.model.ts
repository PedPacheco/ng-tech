import { Prisma } from '@prisma/client';
export interface TransactionsResponse {
    id: string;
    debitedUsername: string | undefined;
    creditedUsername: string | undefined;
    value: number;
    createdAt: string;
}

export interface Transactions {
    id: string
    debitedAccountId: string
    creditedAccountId: string,
    value: number
    createdAt: Date
}