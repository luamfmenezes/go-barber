import { Router } from 'express';
import SessionsController from '@modules/users/infra/http/controllers/SessionsController';
import { celebrate, Segments, Joi } from 'celebrate';

const sessionsController = new SessionsController();

const sessionsRoutes = Router();

sessionsRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),
    sessionsController.create,
);

export default sessionsRoutes;
