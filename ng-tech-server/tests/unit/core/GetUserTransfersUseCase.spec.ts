import { GetUserTransfersUseCase } from "../../../src/core/usecase/GetUserTransfersUseCase"
import { GetUserTransfersGateway } from "../../../src/dataprovider/gateway/GetUserTransfersGateway"

describe('GetUserTransfersUseCase', () => {
    let gateway: GetUserTransfersGateway
    let useCase: GetUserTransfersUseCase

    beforeEach(() => {
        gateway = new GetUserTransfersGateway()
        useCase = new GetUserTransfersUseCase(gateway)
    })

    it(`Quando for feita a chamada do useCase
        Então o gateway deve ser chamado corretamente`, async () => {
            const spyGateway = jest.spyOn(gateway, 'execute').mockResolvedValue([])

            const response = await useCase.execute({id: '1'})

            expect(spyGateway).toHaveBeenCalledTimes(1)
            expect(spyGateway).toHaveBeenCalledWith({id: '1'})
            expect(response).toEqual([])
        })
})