import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { uuid } from 'uuidv4';
import User from '../infra/typeorm/entities/User';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfileService = new UpdateProfileService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update an users profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'Luam menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Pedro',
            email: 'pedro@gmail.com',
            phone: '112233',
        });

        expect(updatedUser.name).toBe('Pedro');
        expect(updatedUser.email).toBe('pedro@gmail.com');
        expect(updatedUser.phone).toBe('112233');
    });

    it('should not be able to update an unexistent user', async () => {
        const tryUpdateUser = updateProfileService.execute({
            user_id: uuid(),
            name: 'jhon doe',
            email: 'jhondoe@gmail.com',
            phone: '112233',
        });

        await expect(tryUpdateUser).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the email to already an email already in use', async () => {
        const user = await fakeUserRepository.create({
            name: 'Luam menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        await fakeUserRepository.create({
            name: 'Jhon doe',
            email: 'jhondoe@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        const tryUpdateUser = updateProfileService.execute({
            user_id: user.id,
            name: 'Pedro',
            email: 'jhondoe@gmail.com',
            phone: '112233',
        });

        await expect(tryUpdateUser).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update an users profile and password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Luam menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Pedro',
            email: 'pedro@gmail.com',
            phone: '112233',
            password: 'teste123',
            old_password: 'adminadmin',
        });

        expect(updatedUser.name).toBe('Pedro');
        expect(updatedUser.email).toBe('pedro@gmail.com');
        expect(updatedUser.phone).toBe('112233');
        expect(updatedUser.password).toBe('teste123');
    });

    it('should not be able to update an users profile with an incorrect old_password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Luam menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        const tryUpdate = updateProfileService.execute({
            user_id: user.id,
            name: 'Pedro',
            email: 'pedro@gmail.com',
            phone: '112233',
            password: 'new-password',
            old_password: 'invalid-old-passoword',
        });

        await expect(tryUpdate).rejects.toBeInstanceOf(AppError);
    });
});
