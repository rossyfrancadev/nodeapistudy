import * as jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import { Config } from '../utils/process';
var config = new Config()
export default class JwtService {


    async  getJsonwt(email: string) {
        try {
            var token = jwt.sign({ email: email }, config.env.SECRET, {
                expiresIn: 300 //expira em 5min
            });
            return await token;
        } catch (error) {
            return;
        }

    }
    async verifyJwt(req: Request, res: Response, next) {
        var token: any = req.headers.authorization;

        if (!token) {
            return res.status(401).send({ auth: false, message: 'No Token provided.' })
        } else {
            jwt.verify(token, config.env.SECRET, (err, decoded) => {
                //validar algum parâmetro do token cliar if de verificação
            
                if (err) return res.status(400).send({ auth: false, message: 'Failed to authentication.' });
               

                next();
            });
        }

    }

}

