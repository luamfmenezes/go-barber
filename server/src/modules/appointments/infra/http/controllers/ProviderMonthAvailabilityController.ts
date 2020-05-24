import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthsAvailability from '@modules/appointments/services/ListProviderMonthsAvailability';

class ProviderMountAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { month, year } = request.query;
        const {provider_id} = request.params;

        const listProviderMonthsAvailability = container.resolve(
            ListProviderMonthsAvailability,
        );

        const availability = await listProviderMonthsAvailability.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
        });

        return response.json(availability);
    }
}

export default ProviderMountAvailabilityController;
