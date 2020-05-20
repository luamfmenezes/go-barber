import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListProviderDayAvailability {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
        day,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                provider_id,
                year,
                month,
                day,
            },
        );

        const hourStart = 8;

        const eachHourOfDay = Array.from(
            { length: 10 },
            (value, index) => hourStart + index,
        );

        const currectDate = new Date(Date.now());

        const availability = eachHourOfDay.map(hour => {
            const hasAppointmentInHour = appointments.find(
                appointment => getHours(appointment.date) === hour,
            );

            const compareDate = new Date(year, month - 1, day, hour);

            return {
                hour,
                available:
                    !hasAppointmentInHour && isAfter(compareDate, currectDate),
            };
        });

        return availability;
    }
}

export default ListProviderDayAvailability;
