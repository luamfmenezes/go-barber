import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
        );

        const avatarFileName = request.file.filename;

        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFileName,
        });

        return response.json(classToClass(user));
    }
}
