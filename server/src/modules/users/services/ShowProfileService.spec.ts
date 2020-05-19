import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';
import { uuid } from 'uuidv4';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        showProfileService = new ShowProfileService(fakeUserRepository);
    });

    it('should be able to detail an user', async () => {
        const user = await fakeUserRepository.create({
            name: 'Luam menezes',
            email: 'luamfmenezes@gmail.com',
            password: 'adminadmin',
            phone: '53981145179',
        });

        const profile = await showProfileService.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe(user.name);
        expect(profile.email).toBe(user.email);
        expect(profile.phone).toBe(user.phone);
    });

    it('should not be able to detail an unexistent user', async () => {
        const tryDetailProfile = showProfileService.execute({
            user_id: uuid(),
        });

        await expect(tryDetailProfile).rejects.toBeInstanceOf(AppError);
    });
});
