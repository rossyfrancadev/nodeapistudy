import DbService from '../services/db.service'
import { ProdutoDTO } from '../dto';

var dbService = new DbService

export default class ProdutosModel {

    async insertProduct(values: ProdutoDTO) {
        console.log(values)
        var conn = await dbService.connectDB();
        return new Promise((resolve, reject) => {
            conn.query(
                `INSERT INTO produtos(nome, descricao, quantidade, valor_compra, valor_venda, data_validade) VALUES
                 ('${values.nome}', '${values.descricao}', ${values.quantidade}, ${values.valor_compra}, ${values.valor_venda}, ${values.data_validade})`, (err, result) => {
                    if (err) {
                        reject(err)
                        console.log('erro ao inserir no banco: ' + err);
                        conn.end();
                    } else {
                        resolve(result);
                        console.log('Produto inserido');
                        conn.end();
                    }
                });
        });
    }

    async getAllProducts() {
        var conn = await dbService.connectDB();
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM produtos', (err, result) => {
                if (err) {
                    reject(err)
                    console.log('erro ao buscar: ' + err);
                    conn.end();
                } else {
                    resolve(result);
                    console.log('busca completa');
                    conn.end();
                }
            });
        });
    }
    public async deleteProduct(id: number) {
        var conn = await dbService.connectDB()
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM produtos WHERE id = ${id}`, (err, result) => {
                if (err) {
                    reject(err);
                    console.log('Erro ao deletar: ' + err);
                    conn.end();
                } else {
                    resolve(result);
                    console.log('produto deletado da base ' + id)
                    conn.end()
                }
            });
        });
    }

    public async listProductByID(id: number) {
        var conn = await dbService.connectDB();
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM produtos WHERE id = ${id}`, (err, result) => {
                if (err) {
                    reject(err);
                    console.log('Erro em busca: ' + err);
                    conn.end();
                } else {
                    resolve(result);
                    console.log('Produto id:' + id + ' encontrado');
                    conn.end();
                }
            });
        });
    }


}