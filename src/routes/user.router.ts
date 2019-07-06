import { UsuariosController } from "../controllers/usuarios.controller";
import { AuthController } from "../controllers/auth.controller";
import { MailController } from '../controllers/mail.controller';
import JwtService from "../services/jwt.service";
import { ProdutosController } from '../controllers/produtos.controller'

export class Routes {


    public usuariosCtrl: UsuariosController = new UsuariosController();
    public authCrtl: AuthController = new AuthController();
    public mailCtrl: MailController = new MailController();
    public jwt: JwtService = new JwtService();

    public produtosController: ProdutosController = new ProdutosController();



    public routes(app: any): void {
        //Usuários que logaram na aplicação

        app.route('/usuarios').get(this.jwt.verifyJwt, this.usuariosCtrl.listUsers)
        app.route('/usuarios').post(this.usuariosCtrl.addUser)
        app.route('/usuarios/:id').get(this.jwt.verifyJwt, this.usuariosCtrl.listById);
        app.route('/usuarios/:id').delete(this.jwt.verifyJwt, this.usuariosCtrl.deleteUser);
        app.route('/usuarios/:id').put(this.jwt.verifyJwt, this.usuariosCtrl.modifyUser);

        //autorização para logar na aplicação
        app.route('/login').post(this.authCrtl.authenticate);
        app.route('/register').post(this.mailCtrl.sendMail);



        //Rotas de produtos
        app.route('/produtos').get(this.produtosController.listProducts);
        app.route('/produtos').post(this.produtosController.addNewProduct);
        app.route('/produtos/:id').get(this.produtosController.selectByID);
        app.route('/produtos/:id').delete(this.produtosController.deleteProduct);

        /**
         *   Rota criada para tester funcionalidades, 
         * a função chamada será modificada conforme a necessidade
         */
        // app.route('/teste').get(this.usuariosCtrl.validaEmail);

    }
}