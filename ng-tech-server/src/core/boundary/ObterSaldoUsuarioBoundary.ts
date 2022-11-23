import idUserRequest from "../../entrypoint/request/IdUserRequest";

interface Account {
    id: string
    balance: any
}

export default interface GetUserBalanceBoundary {
    execute: (id: idUserRequest) => Promise<Account | null>
}