import * as mysql from 'mysql';
import { Config } from '../utils/process';

var config = new Config()

export default class DbService {

    async connectDB() {
        var conn = mysql.createConnection({
            host: config.dbConnectConfig.host,
            user: config.dbConnectConfig.user,
            password: config.dbConnectConfig.password,
            database: config.dbConnectConfig.database
        });
        conn.connect((err) => {
            if (err) throw err;
            console.log('conected!')
        });
        return conn;
    }

}
