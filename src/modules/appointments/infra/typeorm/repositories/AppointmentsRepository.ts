import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointments';

@EntityRepository(Appointment)
class AppointmentsREpository extends Repository<Appointment>
  implements IAppointmentsRepository {

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }
}

export default AppointmentsREpository;
