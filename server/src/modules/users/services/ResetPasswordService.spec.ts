import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('SendForgotPasswordService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPasswordService = new ResetPasswordService(
            fakeUserRepository,
            fakeUserTokenRepository,
            fakeHashProvider,
        );
    });

    it('should be able to reset the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Luam Menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'admin',
            phone: '981145279',
        });

        const { token } = await fakeUserTokenRepository.generateToken(user.id);

        await resetPasswordService.execute({
            token,
            password: '123456',
        });

        const updatedUser = await fakeUserRepository.findById(user.id);

        const changePassword = await fakeHashProvider.compareHash(
            '123456',
            updatedUser?.password || '',
        );

        expect(changePassword).toBeTruthy();
    });

    it('should not be able to reset the password with non-existent token', async () => {
        const tryResetPassword = resetPasswordService.execute({
            token: '890127397123897128973',
            password: '123456',
        });

        await expect(tryResetPassword).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password with non-existent usert', async () => {
        const { token } = await fakeUserTokenRepository.generateToken(
            'non-existent-user',
        );

        const tryResetPassword = resetPasswordService.execute({
            token,
            password: '123456',
        });

        await expect(tryResetPassword).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password if passed more thant two hours from the creation of the token', async () => {
        const user = await fakeUserRepository.create({
            name: 'Luam Menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'admin',
            phone: '981145279',
        });

        const { token } = await fakeUserTokenRepository.generateToken(user.id);

        jest.spyOn(Date, 'now').mockImplementation(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });

        const tryResetPassword = resetPasswordService.execute({
            token,
            password: '123456',
        });

        await expect(tryResetPassword).rejects.toBeInstanceOf(AppError);
    });
});
