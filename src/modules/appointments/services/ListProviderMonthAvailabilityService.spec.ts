// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let listProvidersMonthAvailability: ListProvidersMonthAvailabilityService;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    listProvidersMonthAvailability = new ListProvidersMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('Should be able to list the month availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: '260591-vinny',
      user_id: '123321',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: '260591-vinny',
      user_id: '123321',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: '260591-vinny',
      user_id: '123321',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: '260591-vinny',
      user_id: '123321',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: '260591-vinny',
      user_id: '123321',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: '260591-vinny',
      user_id: '123321',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: '260591-vinny',
      user_id: '123321',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: '260591-vinny',
      user_id: '123321',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: '260591-vinny',
      user_id: '123321',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: '260591-vinny',
      user_id: '123321',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: '260591-vinny',
      user_id: '123321',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: '260591-vinny',
      user_id: '123321',
      date: new Date(2020, 4, 19, 8, 0, 0),
    });

    const availability = await listProvidersMonthAvailability.execute({
      provider_id: '260591-vinny',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
