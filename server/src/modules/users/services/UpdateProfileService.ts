import { inject, injectable } from 'tsyringe';
import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    phone: string;
    password?: string;
    old_password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepostirotory,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        email,
        name,
        phone,
        password,
        old_password,
    }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError('This use dont exist');
        }

        const userWithUpdateEmail = await this.userRepository.findByEmail(
            email,
        );

        if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
            throw new AppError('Email already in user');
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );
            if (!checkOldPassword) {
                throw new AppError('The old_password is invalid');
            }
            user.password = await this.hashProvider.generateHash(password);
        }

        Object.assign(user, { email, name, phone });

        await this.userRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;
