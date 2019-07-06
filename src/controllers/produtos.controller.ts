import { Request, Response } from "express"
import ProdutosModel from "../models/produtos.model";
import { ProdutoDTO } from "../dto";

var produtosModel = new ProdutosModel

export class ProdutosController {


    public async listProducts(req: Request, res: Response, next: any) {
        try {
            let response = await produtosModel.getAllProducts();
            res.status(200)
            res.send(response)
            next();
        } catch (error) {
            console.log('error controller: ' + error);
        }
    }

    public async addNewProduct(req: Request, res: Response, next: any) {
        console.log(req.body)
        let novoProduto: ProdutoDTO = req.body;
        try {
            var response: any = await produtosModel.insertProduct(novoProduto)
            let id = response.insertId;
            res.status(200)
            res.send(id.toString());
            next();
        } catch (error) {
            console.log('Erro controller' + error)
        }

    }

    public async selectByID(req: Request, res: Response, next: any) {
        try {
            let id: number = req.params.id
            let response: any = await produtosModel.listProductByID(id);
            if (response.length > 0) {
                res.status(200).send(response)
                next();
            } else {
                res.status(404).send(`id: ${id} não encontrado na base`)
                next();
            }

        } catch (error) {
            console.log('Erro controller' + error);
        }

    }

    public async deleteProduct(req: Request, res: Response, next: any) {
        let id = req.params.id;
        try {
            let response: any = await produtosModel.listProductByID(id);
            if (response.length > 0) {
                response = await produtosModel.deleteProduct(id);
                console.log(response)
                res.status(200)
                res.send("resouce deleted successfully")
                next();
            } else {
                res.status(404)
                    .send("produto inválido")
                next()
            }
        } catch (error) {
            console.log(error)
        }
    }


}