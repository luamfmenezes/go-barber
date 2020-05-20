import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProviderServices from './ListProviderServices';
import { uuid } from 'uuidv4';

let fakeUserRepository: FakeUserRepository;
let listProviderServices: ListProviderServices;

describe('ListProviderService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        listProviderServices = new ListProviderServices(fakeUserRepository);
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
