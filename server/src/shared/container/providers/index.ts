import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from '../providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '../providers/MailProvider/implementations/EtherealMailProvider';

import IMailTempleteProvider from '../providers/MailTemplateProvider/models/IMailTempleteProvider';
import HandlebarsMailTemplateProvider from '../providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';


container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerSingleton<IMailTempleteProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);
