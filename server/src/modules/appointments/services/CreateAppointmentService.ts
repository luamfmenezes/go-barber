import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { isBefore, getHours, format } from 'date-fns';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
    user_id: string;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,
    ) {}

    public async execute({
        date,
        provider_id,
        user_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
            provider_id,
        );

        if (findAppointInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        if (isBefore(appointmentDate, new Date(Date.now()))) {
            throw new AppError('The date should be after the current date');
        }

        if (user_id === provider_id) {
            throw new AppError(
                'You can not create an appointment with yourself.',
            );
        }

        if (getHours(appointmentDate) > 17) {
            throw new AppError('You can not create an appointment after 17pm.');
        }

        if (getHours(appointmentDate) < 8) {
            throw new AppError('You can not create an appointment before 8am.');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
            user_id,
        });

        const dateFormated = format(appointmentDate, "dd/MM/yyyy 'at' hh:mma");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `New schedule to ${dateFormated}`,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
