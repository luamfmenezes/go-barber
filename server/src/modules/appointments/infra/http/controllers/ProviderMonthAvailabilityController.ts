import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthsAvailability from '@modules/appointments/services/ListProviderMonthsAvailability';

class ProviderMountAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { month, year } = request.body;
        const {provider_id} = request.params;

        const listProviderMonthsAvailability = container.resolve(
            ListProviderMonthsAvailability,
        );

        const availability = await listProviderMonthsAvailability.execute({
            provider_id,
            month,
            year,
        });

        return response.json(availability);
    }
}

export default ProviderMountAvailabilityController;
