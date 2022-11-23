import { GetUserBalanceUseCase } from "../../../src/core/usecase/GetUserBalanceUseCase"
import { GetUserBalanceGateway } from "../../../src/dataprovider/gateway/GetUserBalanceGateway"
import { GetUserBalanceController } from "../../../src/entrypoint/controller/GetUserBalanceController"
import GetUserBalanceMock from '../../mocks/GetUserBalanceMock'

describe('GetUserBalanceController', () => {
    let gateway: GetUserBalanceGateway
    let useCase: GetUserBalanceUseCase
    let controller: GetUserBalanceController

    beforeEach(() => {
        gateway = new GetUserBalanceGateway()
        useCase = new GetUserBalanceUseCase(gateway)
        controller = new GetUserBalanceController(useCase)
    })

    it(`Quando a chamada do controller for feita
        Então useCase deve ser chamado corretamente`, async () => {
            const spyUseCase = jest.spyOn(useCase, 'execute').mockResolvedValue(GetUserBalanceMock)

            const response = await controller.handle({id: '1'}, {}, {})

            expect(spyUseCase).toHaveBeenCalledTimes(1)
            expect(spyUseCase).toHaveBeenCalledWith({id: '1'})
            expect(response).toEqual(GetUserBalanceMock)
        })
})