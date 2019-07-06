
import { Request, Response } from "express";
import { Config } from '../utils/process';
import Mail from "../services/mail.service"
var config = new Config()

export class MailController {

    public async sendMail(req: Request, res: Response, next: any) {
        const message = Object.assign({}, req.body);

        Mail.to = message.to;
        Mail.subject = message.subject;
        Mail.message = message.message;
        try {
            let result = Mail.sendMail();
            res.status(200)
            res.set({
                'Accept': 'text/plain'
            })
        } catch (error) {
            throw (error)
        }



    }

}