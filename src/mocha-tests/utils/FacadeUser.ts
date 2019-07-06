import Http from "../config/http";
import * as Chance from 'chance';

var chance = new Chance();

export default class User {

    public static async newUser(usuario: object = {}) {

        const usuarioDefault: any = {
            userName: chance.name(),
            email: chance.word() + '@teste',
            senha: ''
        }
        let novoUsuario: any = Object.assign({}, usuarioDefault, usuario);
        let res = await Http.post('usuarios', novoUsuario)
        return res;
    }

}