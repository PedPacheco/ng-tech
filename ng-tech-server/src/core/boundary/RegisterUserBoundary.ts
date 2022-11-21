import UsuarioRequest from "../../entrypoint/request/UsuarioRequest";

export default interface RegisterUserBoundary {
    execute: (body: UsuarioRequest) => Promise<UsuarioRequest>
}