import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointementsRouter = Router();
appointementsRouter.use(ensureAuthenticated);
const appointmentsControllers = new AppointmentsController();

// appointementsRoutes.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointementsRouter.post('/', appointmentsControllers.create);

export default appointementsRouter;
