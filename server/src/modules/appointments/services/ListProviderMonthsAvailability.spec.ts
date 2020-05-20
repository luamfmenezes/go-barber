import AppError from '@shared/errors/AppError';
// import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProviderMonthsAvailability from './ListProviderMonthsAvailability';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
// let fakeUserRepository: FakeUserRepository;

let listProviderMonthsAvailability: ListProviderMonthsAvailability;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthsAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthsAvailability = new ListProviderMonthsAvailability(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the mounth availability from provider', async () => {
        for (let i = 8; i < 19; i++) {
            await fakeAppointmentsRepository.create({
                date: new Date(2020, 4, 20, i, 0, 0),
                provider_id: 'provider',
            user_id:'user'
            });
        }
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 21, 8, 0, 0),
            provider_id: 'provider',
            user_id:'user'
        });

        const availability = await listProviderMonthsAvailability.execute({
            year: 2020,
            month: 5,
            provider_id: 'provider',
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 19, available: true },
                { day: 20, available: false },
                { day: 21, available: true },
                { day: 22, available: true },
            ]),
        );
    });
});
