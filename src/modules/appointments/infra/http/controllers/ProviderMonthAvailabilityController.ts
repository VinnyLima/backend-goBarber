import { Request, Response } from 'express';
// import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { month, year } = request.body;

    const listProvidersMonthAvailabity = container.resolve(
      ProviderMonthAvailabilityService,
    );

    const availabity = await listProvidersMonthAvailabity.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availabity);
  }
}
