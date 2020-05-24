import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';
const appointmentsRoutes = Router();

const appointmentsController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            provider_id: Joi.string().required(),
            date: Joi.date(),
        }),
    }),
    appointmentsController.create,
);
appointmentsRoutes.get('/', providerAppointmentsController.index);

export default appointmentsRoutes;

// Luam change the route to provider
