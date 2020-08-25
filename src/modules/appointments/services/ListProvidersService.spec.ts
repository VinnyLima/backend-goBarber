// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProviderService';

let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('Should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Jhon Qua',
      email: 'johndotre@example.com',
      password: '123456',
    });

    const logedUser = await fakeUserRepository.create({
      name: 'Jhon Tre',
      email: 'johndotre@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: logedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
