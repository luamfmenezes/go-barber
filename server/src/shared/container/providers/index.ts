import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from '../providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '../providers/MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    new EtherealMailProvider(),
);
