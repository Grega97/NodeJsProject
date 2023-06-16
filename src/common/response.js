//respuesta estandar enviada desde nuesta API
const createError = require('http-errors'); //creamos errores para poder enviarlos
module.exports.Response = { 
    success: (res, status = 200, message = "Ok", body = {})=>{//recibe 4 parametros
        res.status(status).json({message, body});//enviamos a status el parametro status
    },
    error: (res, error= null)=>{
        //siemppre tendra un statusCode y nu mensaje
        const {statusCode, message} =  error ? error : new createError.InternalServerError(); //operador ternario
        //desestructuramos 
        res.status(statusCode).json({message});
    }
}
