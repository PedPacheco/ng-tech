import UsuarioRequest from "../../entrypoint/request/UsuarioRequest";

interface User {
    user: UsuarioRequest
    token: string
}

export default interface LoginUsuarioBoundary {
    execute: (body: UsuarioRequest) => Promise<User>
}