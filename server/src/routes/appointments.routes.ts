import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentRepository.find();
    return response.json(appointments);
});

appointmentsRoutes.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parseDate,
            provider,
        });

        return response.json({ appointment });
    } catch (err) {
        return response.status(404).json({ error: err.message });
    }
});

export default appointmentsRoutes;
