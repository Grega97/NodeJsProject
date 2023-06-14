require('dotenv').config(); //nos trae las variables de los archivos que necesitamos

module.exports.Config = { //el objeto de este archivo se enviara como variable de entorno
    port: process.env.PORT // SOLICITAMOS LA VARIABLE "PORT" 

}