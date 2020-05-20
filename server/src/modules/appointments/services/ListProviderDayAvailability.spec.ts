import AppError from '@shared/errors/AppError';
import ListProviderDayAvailability from './ListProviderDayAvailability';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let listProviderDayAvailability: ListProviderDayAvailability;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProviderDayAvailability(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the mounth availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 21, 9, 0, 0),
            provider_id: 'user',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 21, 10, 0, 0),
            provider_id: 'user',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 21, 14, 0, 0),
            provider_id: 'user',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 21, 15, 0, 0),
            provider_id: 'user',
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10).getTime();
        });

        const availability = await listProviderDayAvailability.execute({
            year: 2020,
            month: 5,
            provider_id: 'user',
            day: 21,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 11, available: true },
                { hour: 12, available: true },
                { hour: 14, available: false },
            ]),
        );
    });
});
