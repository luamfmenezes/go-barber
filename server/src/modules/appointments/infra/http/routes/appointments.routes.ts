import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/respositories/AppointmentsRepository';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticated);

// appointmentsRoutes.get('/', async (request, response) => {
//     const appointmentRepository = getCustomRepository(AppointmentsRepository);
//     const appointments = await appointmentRepository.find();
//     return response.json(appointments);
// });

appointmentsRoutes.post('/', async (request, response) => {

    const appointmentRepository = new AppointmentsRepository();

    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
        appointmentRepository,
    );

    const appointment = await createAppointment.execute({
        date: parseDate,
        provider_id,
    });

    return response.json({ appointment });
});

export default appointmentsRoutes;
