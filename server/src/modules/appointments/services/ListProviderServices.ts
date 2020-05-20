import { inject, injectable } from 'tsyringe';
import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProviderService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepostirotory,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
        const users = await this.userRepository.findAllProviders({
            except_user_id: user_id,
        });

        return users;
    }
}

export default ListProviderService;
