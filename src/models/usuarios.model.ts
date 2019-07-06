import { LoginDTO, UsuarioDTO } from '../dto';
import DbService from '../services/db.service'

var dbService = new DbService()

export default class UsuariosModel {

    /**
     * Busca todos os usuários do banco
     */
    async getAllUsers() {
        var conn;
        if (!conn) {
            conn = await dbService.connectDB();
        }

        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM usuarios', (err, result) => {
                if (err) {
                    reject(err);
                    conn.end(console.log(err.message));
                } else {
                    resolve(result);
                    console.log('usuários listados');
                    conn.end(console.log('conexão finalizada'));
                }
            });
        });
    }

    /**
     * Inserir um usuário
     */
    async insertUser(values) {
        var conn = await dbService.connectDB();
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO usuarios(nome, email, senha) VALUES ('${values.nome}','${values.email}','${values.senha}')`, (err, result) => {
                if (err) {
                    reject(err);
                    conn.end();
                    console.log(err + "erro Model");
                } else {
                    conn.end();
                    resolve(result);
                    console.log('usuário inserido e conexão finalizada');
                }
            });
        });
    }
    //Valida se o e-mail já existe no banco
    async validateField(email: string) {
        var conn = await dbService.connectDB();
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM usuarios WHERE email = '" + email + "';", (err, result) => {
                if (err) {
                    reject(err);
                    console.log(err)
                    conn.end();
                } else {
                    conn.end();
                    resolve(result);
                }
            });
        });

    }

    async selectUserByID(id: number) {
        var conn = await dbService.connectDB();
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM usuarios WHERE id = ${id}`, (err, result) => {
                if (err) {
                    reject(err);
                    conn.end();
                    console.log(err);
                } else {
                    resolve(result);
                    conn.end();
                    console.log('usuário localizado e conexão finalizada');
                }
            });
        });
    }


    async validateUser(login: LoginDTO) {

        var conn = await dbService.connectDB();
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM usuarios WHERE senha = '${login.senha}' and email = '${login.email}';`, (err, result) => {
                if (err) {
                    reject(err);
                    conn.end();
                    throw (err);
                } else {

                    if (result.length > 0) {
                        resolve(true);
                    } else { resolve(false) }

                    conn.end();
                }

            });
        });
    };

    async deleteUser(id: number) {
        var conn = await dbService.connectDB()
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM usuarios WHERE id = ${id}`, (err, result) => {
                if (err) {
                    reject(err);
                    conn.end();
                    console.log(err);
                } else {
                    resolve(result);
                    conn.end();
                    console.log('usuario removido com sucesso e conesão finalizada');
                }
            });
        });
    }

    async updateUser(id: number, values: UsuarioDTO) {
        var conn = await dbService.connectDB();
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE usuarios SET nome = '${values.nome}', email = '${values.email}', senha = '${values.senha}' WHERE id = ${id};`, (err, result) => {
                if (err) {
                    reject(err);
                    conn.end();
                    console.log(err);
                } else {
                    resolve(result);
                    conn.end();
                }
            });
        });
    }





}



