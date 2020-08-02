import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointementsRouter = Router();
appointementsRouter.use(ensureAuthenticated);

// appointementsRoutes.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointementsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: parseDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointementsRouter;
