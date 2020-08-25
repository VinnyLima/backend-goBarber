import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './showProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });
  it('Should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jhon Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('Should not be able to show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'no-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
