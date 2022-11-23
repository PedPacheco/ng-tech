import idUserRequest from "../../entrypoint/request/IdUserRequest";
import GetUserTransfersBoundary from "../boundary/GetUserTransfersBoundary";

export class GetUserTransfersUseCase {
  public constructor(private readonly boundary: GetUserTransfersBoundary) {
    this.boundary = boundary;
  }
  execute(id: idUserRequest) {
    const response = this.boundary.execute(id);

    return response;
  }
}
