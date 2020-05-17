import User from '@modules/users/infra/typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}
@injectable()
class CreateAppointmentService {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepostirotory,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email.', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(
            password,
            user.password,
        );

        if (!passwordMatched) {
            throw new AppError('Inválid password.', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn,
        });

        return { user, token };
    }
}

export default CreateAppointmentService;
