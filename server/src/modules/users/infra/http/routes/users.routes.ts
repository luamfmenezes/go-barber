import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const upload = multer(uploadConfig);

const userRouter = Router();


userRouter.post('/', async (request, response) => {
    const userRepository = new UserRepository();
    const { name, email, password, phone } = request.body;

    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
        name,
        email,
        password,
        phone,
    });

    delete user.password;

    return response.json(user);
});

userRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const userRepository = new UserRepository();

        const updateUserAvatarService = new UpdateUserAvatarService(userRepository);

        const avatarFileName = request.file.filename;

        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFileName,
        });

        delete user.password;

        return response.json(user);
    },
);

export default userRouter;
