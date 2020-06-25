import { inject, injectable } from 'tsyringe';
import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProviderService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepostirotory,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
        let providers = await this.cacheProvider.recover<User[]>(
            `provider-list:${user_id}`,
        );

        if (!providers) {
            providers = await this.userRepository.findAllProviders({
                except_user_id: user_id,
            });

            await this.cacheProvider.save(
                `provider-list:${user_id}`,
                classToClass(providers),
            );
        }

        return providers;
    }
}

export default ListProviderService;
