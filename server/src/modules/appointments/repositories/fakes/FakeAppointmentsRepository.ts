import { isEqual, getMonth, getDate, getYear } from 'date-fns';
import { uuid } from 'uuidv4';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

// to implement all methods of repository(createm findOne, save ...) its only use extends Repository<Appointment>
// @EntityRepository(Appointment)

class AppointmentRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        );

        return findAppointment;
    }

    public async findAllInMounthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );

        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        month,
        year,
        day,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year &&
                getDate(appointment.date) === day,
        );

        return appointments;
    }

    public async create({
        provider_id,
        date,
        user_id,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), user_id, date, provider_id });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentRepository;
