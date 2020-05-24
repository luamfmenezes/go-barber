import { Router } from 'express';
import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResestPasswordController from '@modules/users/infra/http/controllers/ResestPasswordController';
import { celebrate, Segments, Joi } from 'celebrate';

const forgotPasswordController = new ForgotPasswordController();
const resestPasswordController = new ResestPasswordController();

const passwordRouter = Router();

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
        }),
    }),
    forgotPasswordController.create,
);

passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
        }),
    }),
    resestPasswordController.create,
);

export default passwordRouter;
