import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import { injectable, inject } from 'tsyringe';
import IUsertTokenRepository from '@modules/users/repositories/IUsertTokenRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { isAfter, addHours } from 'date-fns';

interface IRequest {
    password: string;
    token: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepostirotory,
        @inject('UserTokenRepository')
        private userTokenRepository: IUsertTokenRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('UserToken doesnt exists');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User doesnt exists');
        }

        const tokenCreatedAt = addHours(userToken.created_at, 2);

        const tokenHasMoreThan2Hours = isAfter(Date.now(), tokenCreatedAt);

        if (tokenHasMoreThan2Hours) {
            throw new AppError('The is not more valid');
        }

        user.password = await this.hashProvider.generateHash(password);

    this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
