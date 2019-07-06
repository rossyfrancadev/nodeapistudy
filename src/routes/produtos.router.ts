
import JwtService from "../services/jwt.service";
import { ProdutosController } from '../controllers/produtos.controller'

export class Routes {
    public jwt: JwtService = new JwtService();
    public produtosController: ProdutosController = new ProdutosController();

    public routes(app: any): void {
        app.route('/produtos').get(this.produtosController.listProducts);
        app.route('/produtos').post(this.produtosController.addNewProduct);
    }
}