import UsuarioRequest from "../../entrypoint/request/UsuarioRequest";

interface User {
    user: UsuarioRequest
    token: string
}

export default interface RegisterUserBoundary {
    execute: (body: UsuarioRequest) => Promise<User>
}