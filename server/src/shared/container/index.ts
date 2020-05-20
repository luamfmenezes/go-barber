import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers/index';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/respositories/AppointmentsRepository';

import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUsertTokenRepository from '@modules/users/repositories/IUsertTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IUserRepostirotory>(
    'UserRepository',
    UserRepository,
);

container.registerSingleton<IUsertTokenRepository>(
    'UserTokenRepository',
    UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
    'NotificationsRepository',
    NotificationsRepository,
);
