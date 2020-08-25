// import path from 'path';
// import fs from 'fs';
// import uploadConfig from '@config/upload';
// import AppError from '@shared/errors/AppError';
// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}
@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    return users;
  }
}

export default ListProviderService;
