export interface Transactions {
    id: string;
    debitedUsername: string | undefined;
    creditedUsername: string | undefined;
    value: number;
    createdAt: any;
}