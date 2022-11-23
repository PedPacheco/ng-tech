import { HandleTransferUseCase } from "../../../src/core/usecase/HandleTransferUseCase"
import { HandleTransferGateway } from "../../../src/dataprovider/gateway/HandleTransferGateway"
import { HandleTransferController } from "../../../src/entrypoint/controller/HandleTransferController"
import {HandleTransferMock} from '../../mocks/HandleTransferMock'

describe('HandleTransferController', () => {
    let gateway: HandleTransferGateway
    let useCase: HandleTransferUseCase
    let controller: HandleTransferController

    beforeEach(() => {
        gateway = new HandleTransferGateway()
        useCase = new HandleTransferUseCase(gateway)
        controller = new HandleTransferController(useCase)
    })

    it(`Quando a chamada do controller for feita
        Então useCase deve ser chamado corretamente`, async () => {
            const spyUseCase = jest.spyOn(useCase, 'execute').mockResolvedValue(HandleTransferMock)

            const response = await controller.handle({}, {}, HandleTransferMock)

            expect(spyUseCase).toHaveBeenCalledTimes(1)
            expect(spyUseCase).toHaveBeenCalledWith(HandleTransferMock)
            expect(response).toEqual(HandleTransferMock)
        })
})