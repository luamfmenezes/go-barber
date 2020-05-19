import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        createUserService = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUserService.execute({
            name: 'Luam menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        expect(user).toHaveProperty('id');
        expect(user.email).toBe('luamfmenezes@gmail.com');
        expect(user.name).toBe('Luam menezes');
        expect(user.phone).toBe('53981145179');
    });

    it('should not be possible to create a new user with an already used email', async () => {
        await createUserService.execute({
            name: 'Luam menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        const user = createUserService.execute({
            name: 'Luam menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        await expect(user).rejects.toBeInstanceOf(AppError);
    });
});
