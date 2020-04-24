import { Router } from 'express';
import { parseISO } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointementsRoutes = Router();


appointementsRoutes.get('/',  async (request, response) => {
  const appointmentsRepository =  getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointementsRoutes.post('/', async(request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parseDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
   
    return response.status(400).json({ error: err.message });
  }
});

export default appointementsRoutes;
