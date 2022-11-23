import idUserRequest from "../../entrypoint/request/IdUserRequest";

interface Transactions {
  debitedUsername: string | undefined
  creditedUsername: string | undefined;
  value: any;
  createdAt: any;
}

export default interface GetUserTranfersBoundary {
  execute: (id: idUserRequest) => Promise<(Transactions | undefined)[]>;
}
