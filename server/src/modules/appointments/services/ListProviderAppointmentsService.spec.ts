import AppError from '@shared/errors/AppError';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointmentsService', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list all your appointments in a specifc day', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 21, 9, 0, 0),
            provider_id: 'provider',
            user_id: 'user',
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 21, 10, 0, 0),
            provider_id: 'provider',
            user_id: 'user',
        });

        const appointment3 = await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 21, 16, 0, 0),
            provider_id: 'provider',
            user_id: 'user',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 22, 14, 0, 0),
            provider_id: 'provider',
            user_id: 'user',
        });

        const availability = await listProviderAppointmentsService.execute({
            year: 2020,
            month: 5,
            provider_id: 'provider',
            day: 21,
        });

        expect(availability).toEqual([
            appointment1,
            appointment2,
            appointment3,
        ]);
    });
});
