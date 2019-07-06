import { Request, Response } from "express";
import UsuariosModel from '../models/usuarios.model';
import { UsuarioDTO } from "../dto";

var userModel = new UsuariosModel();

export class UsuariosController {

    public async listUsers(req: Request, res: Response, next: any) {
        try {
            let response = await userModel.getAllUsers();
            res.status(200)
            res.setHeader('Content-Type', 'application/json')
            res.send(response)
            next();
        } catch (error) {
            console.log('error no controller' + error);
        }
    }

    public async listById(req: Request, res: Response, next: any) {
        try {
            let id = req.params.id
            let response: any = await userModel.selectUserByID(id);
            if (response.length > 0) {
                res.status(200);
                res.send(response);
                next()
            } else {
                res.status(400).send("usuário não existe");
            }
        } catch (error) {

        }

    }

    public async addUser(req: Request, res: Response, next: any) {
        let novoUsuario = req.body;
        let response: any
        try {
            response = await userModel.validateField(novoUsuario.email);

            if (response.length > 0) {
                res.status(400).send("já existe um usuário com esse e-mail cadastrado");
                next();
            } else {
                response = await userModel.insertUser(novoUsuario);
                let id = response.insertId;
                res.status(201).send(id.toString());
                next();
            }
        } catch (error) {
            console.log(error)
        }

    }

    public async deleteUser(req: Request, res: Response) {
        let id = req.params.id;
        try {

            let resposta = await userModel.deleteUser(id)
            res.status(200).send('Usuário id:' + id + ' removido');
        } catch (error) {

        }


    }

    public async modifyUser(req: Request, res: Response) {

        let id = req.params.id;

        let user = await userModel.selectUserByID(id)
        let modify = Object.assign({},req.body,user)
        console.log(modify)
        let resposta = await userModel.updateUser(id, modify)

        res.status(201).send(resposta)


    }

    // public async validaEmail(req: Request, res: Response) {

    //     let email = req.body.email;
    //     let resposta = await connect.validateField(email);
    //     res.status(200);
    //     res.send(resposta);
    // }

}