import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface Request {
    name: string;
    email: string;
    password: string;
    phone: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepostirotory,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        name,
        email,
        password,
        phone,
    }: Request): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        return user;
    }
}

export default CreateUserService;
