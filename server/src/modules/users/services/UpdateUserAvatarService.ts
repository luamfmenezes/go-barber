import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { injectable, inject } from 'tsyringe';

interface Request {
    user_id: string;
    avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepostirotory,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can chenage avatar',
                401,
            );
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }

        await this.storageProvider.saveFile(avatarFileName);

        user.avatar = avatarFileName;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
