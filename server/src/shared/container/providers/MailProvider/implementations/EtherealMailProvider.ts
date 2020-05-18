import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
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

    public async sendMail(to: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            from: '"Gobarber Time ✂" <example@example.com>',
            to,
            subject: 'Recovery password',
            text: body,
        });

        console.log(
            `Email sent ${to}: ${nodemailer.getTestMessageUrl(message)}`,
        );
    }
}

export default EtherealMailProvider;
