import { inject, injectable } from 'tsyringe';
import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepostirotory,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(user_id);

        if(!user){
            throw new AppError('The user dont exist');
        }

        return user;
    }
}

export default ShowProfileService;
