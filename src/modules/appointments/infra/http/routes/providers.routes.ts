import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersControllers';
import ProvidersDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProvidersMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAcailabilityController = new ProvidersDayAvailabilityController();
const providerMonthAcailabilityController = new ProvidersMonthAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.post('/', providersController.index);
providersRouter.post(
  '/:provider_id/month-availability',
  providerMonthAcailabilityController.index,
);
providersRouter.post(
  '/:provider_id/day-availability',
  providerDayAcailabilityController.index,
);

export default providersRouter;
