
import { Request, Response } from "express";
import UsuariosModel from '../models/usuarios.model'
import { LoginDTO } from "../dto";
import { Config } from '../utils/process';
var config = new Config()
import JwtService from "../services/jwt.service";
// import JwtService, * as Jwt from '../utils/jwt.service'
var jwtService = new JwtService();
var usuariosModel = new UsuariosModel


export class AuthController {



    /**
     * setar o token pelo header...no front end pegar o token e setar no cookie para ficar na sessão
    
     */


    public async authenticate(req: Request, res: Response, next) {

        let login: LoginDTO = {
            email: req.body.email,
            senha: req.body.senha
        };


        try {
            let response: any = await usuariosModel.validateUser(login);
            //incluir parâmetro para tipo de usuário que está logado
            if (response) {
                var token = await jwtService.getJsonwt(login.email);
                res.status(200).send({ auth: true, token });
                next();
            } else {
                res.status(404).send({ auth: false, message: "Login inválido" });
                next();
            }
        } catch (error) {
            console.log(error)
            next();
        }


    }

}

