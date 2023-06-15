const express =  require('express');
const debug = require('debug')('app:main');
const app = express();
const {Config} = require('./src/config');
app.use(express.json()); //recibe datos en el body de la peticion realizada
/* MODULOS */
const { ProductsAPI } = require('./src/products');//anadiendo modulos
ProductsAPI(app);//recibimos app

app.listen(Config.port,()=>{ //CON Config.port, accedemos a la variable de entorno en la ruta asiganada.
    debug(`Server Listen Port ${Config.port}`);
})