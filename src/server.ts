import app from './app';
import { Config } from './utils/process';
var process= new Config();
var PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Servidor rodando na porta  ' + PORT);
});