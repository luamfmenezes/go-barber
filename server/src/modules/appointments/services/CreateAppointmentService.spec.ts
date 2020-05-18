import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointmentService', () => {
    it('should be able to create a new appoinment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointmentService = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointment = await createAppointmentService.execute({
            date: new Date(),
            provider_id: '3123908129389012',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('3123908129389012');
    });

    it('should not be able to create a two appoinments on the same time', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointmentService = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const date = new Date(2020, 3, 4, 10, 11);

        await createAppointmentService.execute({
            date,
            provider_id: '3123908129389012',
        });

        const appointmentWithTheSameDate = createAppointmentService.execute({
            date,
            provider_id: '3123908129389012',
        });

        await expect(appointmentWithTheSameDate).rejects.toBeInstanceOf(AppError);
    });
});
