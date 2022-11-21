import { Router } from 'express';

import { expressAdapter } from '../../middleware/adapter/ExpressAdapter';
import { validate } from '../../middleware/validator/validate';
import { verifyJwt } from '../../middleware/verifiedJwt/verifyJwt';
import { schemas } from '../../utils/schemas';
import { RegisterUserModule } from '../module/RegisterUserModule';
import { FilterTransactionsModule } from '../module/FilterTransactionsModule';
import { GetUserTransfersModule } from '../module/GetUserTransfersModule';
import { HandleTransferModule } from '../module/HandleTransferModule';
import { LoginUsuarioModule } from '../module/LoginUsuarioModule';
import { ObterSaldoUsuarioModule } from '../module/ObterSaldoUsuarioModule';

export const routes = Router();

routes.post("/cadastrar", validate(schemas.user), expressAdapter(RegisterUserModule))
routes.post("/login", validate(schemas.user), expressAdapter(LoginUsuarioModule))
routes.get("/saldo/:id", verifyJwt, expressAdapter(ObterSaldoUsuarioModule))
routes.put("/transferencia", verifyJwt, expressAdapter(HandleTransferModule))
routes.get("/transferencia/:id", expressAdapter(GetUserTransfersModule))
routes.get("/filtro-transferencia/:id/", verifyJwt, expressAdapter(FilterTransactionsModule))