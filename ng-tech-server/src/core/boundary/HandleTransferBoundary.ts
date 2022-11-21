import HandleTransferRequest from "../../entrypoint/request/HandleTransferRequest";

export default interface HandleTransferBoundary {
    execute: (body: HandleTransferRequest) => Promise<any>
}