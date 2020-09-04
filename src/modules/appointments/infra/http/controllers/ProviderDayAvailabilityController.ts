import { Request, Response } from 'express';
// import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDAyAvaliabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { day, month, year } = request.body;

    const listProvidersDayAvailabity = container.resolve(
      ProviderDayAvailabilityService,
    );

    const availabity = await listProvidersDayAvailabity.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availabity);
  }
}
