import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
import { celebrate, Segments, Joi } from 'celebrate';

const providerRoutes = Router();

const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providerRoutes.use(ensureAuthenticated);

providerRoutes.get('/', providersController.index);

providerRoutes.get(
    '/:provider_id/month-availability',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            provider_id: Joi.string().uuid().required(),
        }),
    }),
    providerMonthAvailabilityController.index,
);

providerRoutes.get(
    '/:provider_id/day-availability',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            provider_id: Joi.string().uuid().required(),
        }),
    }),
    providerDayAvailabilityController.index,
);

export default providerRoutes;
