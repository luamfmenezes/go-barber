import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import { injectable, inject } from 'tsyringe';
import IMailTempleteProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTempleteProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTempleteProvider,
    ) {
        nodemailer.createTestAccount().then(testAccount => {
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
            this.client = transporter;
        });
    }

    public async sendMail({
        to,
        subject,
        from,
        templateData,
    }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from?.name || 'GoBarberTime',
                address: from?.email || 'oi@gobarber.com',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });

        console.log(
            `Email sent ${to}: ${nodemailer.getTestMessageUrl(message)}`,
        );
    }
}

export default EtherealMailProvider;
