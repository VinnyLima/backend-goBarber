import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../entities/User';
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";


class UsersRepository implements IUsersRepository {

  private ormRepository: Repository<User>

  constructor(){
    this.ormRepository = getRepository(User);
  }

  public async findById(id:string): Promise<User | undefined>{

  }

  public async findByEmail(email:string): Promise<User | undefined>{
      
}

public async save(user:User): Promise<User>{
      
}

  public async create({provider_id, date}: ICreateAppointmentDTO): Promisse<Appointment>{
      const appointment = this.ormRepository.create({provider_id, date});

      await this.ormRepository.save(appointment);

      return appointment;
  }
}

export default UsersRepository;
