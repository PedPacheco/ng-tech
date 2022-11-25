import idUserRequest from "../../entrypoint/request/IdUserRequest";
import { TransactionsResponse } from "../models/Transactions.model";

export default interface GetUserTranfersBoundary {
  execute: (id: idUserRequest) => Promise<(TransactionsResponse | undefined)[]>;
}
