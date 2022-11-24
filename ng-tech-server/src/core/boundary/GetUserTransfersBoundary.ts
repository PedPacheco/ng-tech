import idUserRequest from "../../entrypoint/request/IdUserRequest";

export default interface GetUserTranfersBoundary {
  execute: (id: idUserRequest) => Promise<unknown>;
}
