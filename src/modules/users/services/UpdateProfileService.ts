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

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('use not found');
    }
    const userWitheUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWitheUpdateEmail && userWitheUpdateEmail.id !== user_id) {
      throw new AppError('E-mail already in use');
    }
    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('old password not declared');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfile;
