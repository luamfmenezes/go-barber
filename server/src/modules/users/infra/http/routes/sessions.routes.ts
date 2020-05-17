import { Router } from 'express';
import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sessionsController = new SessionsController();

const sessionsRoutes = Router();

sessionsRoutes.post('/', sessionsController.create);

export default sessionsRoutes;
