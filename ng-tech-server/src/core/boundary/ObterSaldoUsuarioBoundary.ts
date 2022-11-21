import idUserRequest from "../../entrypoint/request/IdUserRequest";

interface Account {
    id: string
    balance: number
}

export default interface GetUserBalanceBoundary {
    execute: (id: idUserRequest) => Promise<Account | null>
}