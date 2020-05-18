import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordService', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeUserRepository,
            fakeMailProvider,
            fakeUserTokenRepository
        );
    });

    it('should recive an email to recovered the password', async () => {
        const spySendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUserRepository.create({
            name: 'Luam Menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'admin',
            phone: '981145279',
        });

        await sendForgotPasswordEmailService.execute({
            email: 'luamfmenezes@gmail.com',
        });

        expect(spySendMail).toHaveBeenCalled();
    });

    it('should not be able to recovered the password using an unsubscrived email', async () => {
        const trySendMail = sendForgotPasswordEmailService.execute({
            email: 'luamfmenezes@gmail.com',
        });

        await expect(trySendMail).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a token and send user by email', async () => {

        const fnGenerateToken = jest.spyOn(
            fakeUserTokenRepository,
            'generateToken',
        );

        const user = await fakeUserRepository.create({
            name: 'Luam Menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'admin',
            phone: '981145279',
        });

        const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeUserRepository,
            fakeMailProvider,
            fakeUserTokenRepository,
        );

        await sendForgotPasswordEmailService.execute({
            email: 'luamfmenezes@gmail.com',
        });

        await expect(fnGenerateToken).toBeCalledWith(user.id);
    });
});
