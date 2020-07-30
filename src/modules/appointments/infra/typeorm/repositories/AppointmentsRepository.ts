import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointments';
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";


class AppointmentsREpository implements IAppointmentsRepository {

  private ormRepository: Repository<Appointment>

  constructor(){
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }

  public async create({provider_id, date}: ICreateAppointmentDTO): Promisse<Appointment>{
      const appointment = this.ormRepository.create({provider_id, date});

      await this.ormRepository.save(appointment);

      return appointment;
  }
}

export default AppointmentsREpository;
