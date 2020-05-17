import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUserService', () => {
    it('should be possible authenticate with valid credentials', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
        const authenticateUserService = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        await createUserService.execute({
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
            phone: '53981145279',
            name: 'Luam Fmenezes',
        });

        const user = await authenticateUserService.execute({
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
        });

        expect(user).toHaveProperty('user');
        expect(user).toHaveProperty('token');
    });

    it('should not be possible authenticate with non existing user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUserService = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        const user = authenticateUserService.execute({
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
        });

        expect(user).rejects.toBeInstanceOf(AppError);
    });

    it('should not be possible authenticate with a wrong password', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
        const authenticateUserService = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        await createUserService.execute({
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
            phone: '53981145279',
            name: 'Luam Fmenezes',
        });

        const user = authenticateUserService.execute({
            email: 'luamfmenezes@gmail.com',
            password: 'wrong-password',
        });

        expect(user).rejects.toBeInstanceOf(AppError);
    });
});
