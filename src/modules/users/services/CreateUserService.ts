import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Endereço de Email ja existe', 401);
    }

    const hashPassword = await hash(password, 10);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}
export default CreateUserService;
