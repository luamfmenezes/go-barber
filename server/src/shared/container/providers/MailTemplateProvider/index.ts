import { container } from 'tsyringe';

import IMailTempleteProvider from './models/IMailTempleteProvider';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
    handlebars: container.resolve(HandlebarsMailTemplateProvider),
};

container.registerInstance<IMailTempleteProvider>(
    'MailTemplateProvider',
    providers.handlebars,
);
