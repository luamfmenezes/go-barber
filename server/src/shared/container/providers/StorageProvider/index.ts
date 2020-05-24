import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
    disk: container.resolve(DiskStorageProvider),
};

container.registerInstance<IStorageProvider>(
    'StorageProvider',
    providers.disk,
);
