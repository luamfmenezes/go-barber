import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('CreateUserService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        createUserService = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
        authenticateUserService = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('should be possible authenticate with valid credentials', async () => {
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
        const user = authenticateUserService.execute({
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
        });

        await expect(user).rejects.toBeInstanceOf(AppError);
    });

    it('should not be possible authenticate with a wrong password', async () => {
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

        await expect(user).rejects.toBeInstanceOf(AppError);
    });
});
