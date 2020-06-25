import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderServices from '@modules/appointments/services/ListProviderServices';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;

        const listProviderServices = container.resolve(ListProviderServices);

        const providers = await listProviderServices.execute({ user_id });

        return response.json(classToClass(providers));
    }
}
