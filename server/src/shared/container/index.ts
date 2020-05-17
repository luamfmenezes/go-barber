import { container } from 'tsyringe';

import '@modules/users/providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/respositories/AppointmentsRepository';

import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IUserRepostirotory>(
    'UserRepository',
    UserRepository,
);
