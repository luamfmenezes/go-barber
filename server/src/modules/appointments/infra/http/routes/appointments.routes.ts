import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
const appointmentsRoutes = Router();

const appointmentsController = new AppointmentController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.post('/', appointmentsController.create);
appointmentsRoutes.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);
appointmentsRoutes.get('/:provider_id/day-availability', providerDayAvailabilityController.index);

export default appointmentsRoutes;
