import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
const providerRoutes = Router();

const providersController = new ProvidersController();

providerRoutes.use(ensureAuthenticated);

providerRoutes.get('/', providersController.index);

export default providerRoutes;
