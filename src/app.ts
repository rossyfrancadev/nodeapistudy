import { Routes } from "./routes/user.router";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from 'cookie-parser';



class App {
    public app: express.Application;
    public routes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routes.routes(this.app);

    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser())

        //TODO: isolar a função que configura o header
        this.app.use((req, res, next) => {
            res.append('Access-Control-Allow-Origin', 'http://localhost:5000');
            res.append("Access-Control-Expose-Headers", 'Authorization');
            res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.append('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
            next();
        });
    }
}
export default new App().app;