import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ListProvidersServide from '@modules/appointments/services/ListProviderService';

export default class ProvidersControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersServide);

    const providers = await listProviders.execute({
      user_id,
    });

    return response.json(providers);
  }
}
