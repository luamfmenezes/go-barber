import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointmentService', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        createAppointmentService = new CreateAppointmentService(
            fakeAppointmentRepository,
            fakeNotificationsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new appoinment', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createAppointmentService.execute({
            date: new Date(2020, 4, 10, 14),
            provider_id: 'provider',
            user_id: 'user',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider');
    });

    it('should not be able to create a two appoinments on the same time', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const date = new Date(2020, 4, 10, 14);

        await createAppointmentService.execute({
            date,
            provider_id: 'provider',
            user_id: 'user',
        });

        const appointmentWithTheSameDate = createAppointmentService.execute({
            date,
            provider_id: 'provider',
            user_id: 'user',
        });

        await expect(appointmentWithTheSameDate).rejects.toBeInstanceOf(
            AppError,
        );
    });

    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const date = new Date(2020, 4, 10, 11);

        const tryCreateAppointment = createAppointmentService.execute({
            date,
            provider_id: '3123908129389012',
            user_id: 'user',
        });

        await expect(tryCreateAppointment).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment with the provider beein the same user', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const date = new Date(2020, 4, 10, 16);

        const tryCreateAppointment = createAppointmentService.execute({
            date,
            provider_id: 'user-provider',
            user_id: 'user-provider',
        });

        await expect(tryCreateAppointment).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const tryCreateAppointmentBefore8am = createAppointmentService.execute({
            date: new Date(2020, 4, 15, 7),
            provider_id: 'provider',
            user_id: 'user',
        });

        const tryCreateAppointmentAfter5pm = createAppointmentService.execute({
            date: new Date(2020, 4, 15, 18),
            provider_id: 'provider',
            user_id: 'user',
        });

        await expect(tryCreateAppointmentBefore8am).rejects.toBeInstanceOf(
            AppError,
        );

        await expect(tryCreateAppointmentAfter5pm).rejects.toBeInstanceOf(
            AppError,
        );
    });

    it('should send a notification when a appointment is created', async () => {
        const spyCreateNotification = jest.spyOn(
            fakeNotificationsRepository,
            'create',
        );

        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await createAppointmentService.execute({
            date: new Date(2020, 4, 15, 13),
            provider_id: 'provider',
            user_id: 'user',
        });

        expect(spyCreateNotification).toBeCalledWith(
            expect.objectContaining({
                recipient_id: 'provider',
            }),
        );
    });
});
