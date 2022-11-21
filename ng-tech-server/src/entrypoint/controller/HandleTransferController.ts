import { HandleTransferUseCase } from '../../core/usecase/HandleTransferUseCase';
import HandleTransferRequest from '../request/HandleTransferRequest';

export class HandleTransferController {
  public constructor(private readonly useCase: HandleTransferUseCase) {
    this.useCase = useCase;
  }

  handle(reqParams: any, reqQuery: any, reqBody: HandleTransferRequest) {
    const { amount, fromUsername, toUsername } = reqBody;

    return this.useCase.execute({
      amount,
      fromUsername,
      toUsername
    });
  }
}
