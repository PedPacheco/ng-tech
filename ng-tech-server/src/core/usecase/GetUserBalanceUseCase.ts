import idUserRequest from "../../entrypoint/request/IdUserRequest";
import GetUserBalanceBoundary from "../boundary/GetUserBalanceBoundary";

export class GetUserBalanceUseCase {
  public constructor(private readonly boundary: GetUserBalanceBoundary) {
    this.boundary = boundary;
  }
  execute(id: idUserRequest) {
    const response = this.boundary.execute(id);

    return response;
  }
}