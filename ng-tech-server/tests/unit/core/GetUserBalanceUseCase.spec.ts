import { GetUserBalanceUseCase } from "../../../src/core/usecase/GetUserBalanceUseCase"
import { GetUserBalanceGateway } from "../../../src/dataprovider/gateway/GetUserBalanceGateway"
import GetUserBalanceMock from '../../mocks/GetUserBalanceMock'

describe('GetUserBalanceUseCase', () => {
    let gateway: GetUserBalanceGateway
    let useCase: GetUserBalanceUseCase

    beforeEach(() => {
        gateway = new GetUserBalanceGateway()
        useCase = new GetUserBalanceUseCase(gateway)
    })

    it(`Quando for feita a chamada do useCase
        Então o gateway deve ser chamado corretamente`, async () => {
            const spyGateway = jest.spyOn(gateway, 'execute').mockResolvedValue(GetUserBalanceMock)

            const response = await useCase.execute({id: '1'})

            expect(spyGateway).toHaveBeenCalledTimes(1)
            expect(spyGateway).toHaveBeenCalledWith({id: '1'})
            expect(response).toEqual(GetUserBalanceMock)
        })
})