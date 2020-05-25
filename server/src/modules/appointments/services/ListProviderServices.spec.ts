import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProviderServices from './ListProviderServices';
import { uuid } from 'uuidv4';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeCacheProvider: FakeCacheProvider;
let fakeUserRepository: FakeUserRepository;
let listProviderServices: ListProviderServices;

describe('ListProviderService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderServices = new ListProviderServices(
            fakeUserRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to detail an user', async () => {
        const user1 = await fakeUserRepository.create({
            name: 'Jhon dou',
            email: 'dou@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        const user2 = await fakeUserRepository.create({
            name: 'Jhon trhe',
            email: 'trhe@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        const user3 = await fakeUserRepository.create({
            name: 'Jhon quat',
            email: 'quat@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        const providers = await listProviderServices.execute({
            user_id: user1.id,
        });

        expect(providers).toEqual([user2, user3]);
    });
});
