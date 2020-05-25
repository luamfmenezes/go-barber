import { inject, injectable } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

@injectable()
class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
        day,
    }: IRequest): Promise<Appointment[]> {
        const appointmentCacheKey = `provider-appointment:${provider_id}:${year}-${month}-${day}`;

        let appointments = await this.cacheProvider.recover<Appointment[]>(
            appointmentCacheKey,
        );

        if (!appointments) {
            appointments = await this.appointmentsRepository.findAllInDayFromProvider(
                {
                    provider_id,
                    year,
                    month,
                    day,
                },
            );

            await this.cacheProvider.save(appointmentCacheKey, appointments);
        }

        return appointments;
    }
}

export default ListProviderAppointmentsService;
