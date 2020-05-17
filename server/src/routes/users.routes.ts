import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import multer from 'multer';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);

const userRouter = Router();

userRouter.post('/', async (request, response) => {
    try {
        const { name, email, password, phone } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
            phone,
        });

        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(404).json({ error: err.message });
    }
});

userRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const updateUserAvatarService = new UpdateUserAvatarService();

            const avatarFileName = request.file.filename;

            const user = await updateUserAvatarService.execute({
                user_id: request.user.id,
                avatarFileName,
            });

            delete user.password;

            return response.json(user);
        } catch (err) {
            return response.status(404).json({ error: err.message });
        }
    },
);

export default userRouter;
