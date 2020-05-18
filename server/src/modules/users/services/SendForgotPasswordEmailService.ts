import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsertTokenRepository from '@modules/users/repositories/IUsertTokenRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepostirotory,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
        @inject('UserTokenRepository')
        private userTokenRepository: IUsertTokenRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('This email is not from an user.');
        }

        const { token } = await this.userTokenRepository.generateToken(user.id);

        await this.mailProvider.sendMail(email, `Recover password: ${token}`);
    }
}

export default SendForgotPasswordEmailService;
