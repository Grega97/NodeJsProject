//Generar conexion con MONGO ATLAS
const { MongoClient } = require("mongodb"); //necesitamos un mongoclient
const debug = require("debug")("app:module-db");
const { Config } = require("../config");

var connection = null;
//se exportara una funcion que nos devuevla la base de datos
module.exports.Database = (collection) =>
  new Promise(async (res, rej) => {
    try {
      if (!connection) {
        const client = new MongoClient(Config.mongoUri); //recibe de parametro la URL d consulta creando una nueva conexion
        connection = await client.connect(); //creamos uan nueva conexion
        debug("New conection with MgDB Atlas");
      }
      debug("Reusing Conection");
      const db = connection.db(Config.dbname); //coenctamos y guardamos en al variable
      res(db.collection(collection)); //entregar la collection que usa previa a la promesa
    } catch (error) {
      rej(error);
    }
  });
