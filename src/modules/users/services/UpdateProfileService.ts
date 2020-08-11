// import path from 'path';
// import fs from 'fs';
// import uploadConfig from '@config/upload';
// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProviders';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}
@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user_id, name, email }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('use not found');
    }
    const userWitheUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWitheUpdateEmail && userWitheUpdateEmail.id !== user_id) {
      throw new AppError('E-mail already');
    }
    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}

export default UpdateProfile;
