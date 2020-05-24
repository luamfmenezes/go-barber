import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailability';

class ProviderMountAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { month, year, day } = request.query;
        const { provider_id } = request.params;

        const listProviderDayAvailability = container.resolve(
            ListProviderDayAvailability,
        );

        const availability = await listProviderDayAvailability.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
            day: Number(day),
        });

        return response.json(availability);
    }
}

export default ProviderMountAvailabilityController;
