import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
const usersController = new UsersController();

const upload = multer(uploadConfig);

const userRouter = Router();

userRouter.post('/', usersController.create);

userRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
        );

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
