import * as nodemailer from "nodemailer";

import { Config } from '../utils/process';
var config = new Config()


class MailService {

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string,
   
    ) { }

    sendMail() {

        let mailOptions = {
            from: 'rossyfranca@gmail.com',
            to: this.to,
            subject: this.subject,
            html: this.message,
            attachments: [],

        };
        const transporter = nodemailer.createTransport({
            service: config.mail.service,
            port: config.mail.port,
            secure: false,
            auth: {
                user: config.mail.user,
                pass: config.mail.password
            },
            tls: { rejectUnauthorized: false }
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                transporter.close();
            } else {
                console.log('Email sent: ' + info.response);
                transporter.close();
            }
        });

    }


}
export default new MailService;