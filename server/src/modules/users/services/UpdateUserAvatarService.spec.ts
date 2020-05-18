import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

describe('UpdateUserAvatarService', () => {
    it('should be possible update users avatar', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUserRepository,
            fakeStorageProvider,
        );

        const user = await fakeUserRepository.create({
            name: 'Luam menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be possible update avatar from a non existent user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUserRepository,
            fakeStorageProvider,
        );

        const tryUpdateAvatar = updateUserAvatarService.execute({
            user_id: 'non-existent-user',
            avatarFileName: 'avatar.jpg',
        });

        await expect(tryUpdateAvatar).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when update a new one', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const fnDeleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUserRepository,
            fakeStorageProvider,
        );

        const user = await fakeUserRepository.create({
            name: 'Luam menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg',
        });

        expect(fnDeleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
});
