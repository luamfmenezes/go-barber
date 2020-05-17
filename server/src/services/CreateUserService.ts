import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
    phone: string;
}

class CreateUserService {
    public async execute({
        name,
        email,
        password,
        phone,
    }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw Error('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
