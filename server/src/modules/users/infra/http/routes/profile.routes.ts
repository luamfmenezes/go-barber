import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileController = new ProfileController();

const profileRoutes = Router();

profileRoutes.use(ensureAuthenticated);

profileRoutes.put(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            phone: Joi.string().required(),
            old_password: Joi.string(),
            password: Joi.string(),
        }),
    }),
    profileController.update,
);

export default profileRoutes;
