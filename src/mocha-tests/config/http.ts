import chai = require('chai');
import chaiHttp = require('chai-http');
chai.use(chaiHttp)
import { Request, Response } from 'superagent';
import Config from './config';



export default class Http {


    public static async get(url: string, data: object = {}, headers: any = {}) {
        let request = chai.request(Config.api_url).get(url).query(data);
        return Http.send(request, {}, headers);
    }

    public static async post(url: string, data: object, headers: any = {}) {
        let request = chai.request(Config.api_url).post(url);
        return Http.send(request, data, headers);
    }

    public static put(url: string, data: object, headers: any = {}) {
        let request = chai.request(Config.api_url).put(url).query(data);
        return Http.send(request, data, headers);
    }

    public static delete(url: string, data: object, headers: any = {}) {
        let request = chai.request(Config.api_url).del(url).query(data);
        return Http.send(request, data, headers);
    }

    public static postForm(url: string, data: object, headers: any = {}) {
        let request = chai.request(Config.api_url).post(url).type('form');
        return Http.send(request, data, headers);
    }


    public static async send(requestObj: Request, data: object = {}, headers: any = {}) {
        return new Promise<Response>(async (resolve, reject) => {

            Object.keys(headers).forEach(header => {
                requestObj.set(header, headers[header]);
            });

            requestObj.send(data).end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

}