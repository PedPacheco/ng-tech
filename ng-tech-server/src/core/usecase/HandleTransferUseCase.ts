import HandleTransferRequest from '../../entrypoint/request/HandleTransferRequest';
import HandleTransferBoundary from '../boundary/HandleTransferBoundary';

export class HandleTransferUseCase {
  public constructor(private readonly boundary: HandleTransferBoundary) {
    this.boundary = boundary;
  }
  execute({amount, fromUsername, toUsername}: HandleTransferRequest) {
    if(fromUsername === toUsername) {
      return
    }
    
    const response = this.boundary.execute({amount, fromUsername, toUsername});

    return response;
  }
}