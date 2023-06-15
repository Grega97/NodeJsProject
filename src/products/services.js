const { ObjectId } = require('mongodb');
//Traer el modulo de la database
const {Database} = require('../database');
//funciones de manipulacion de datos
const COLLECTION = 'products'
const getAll = async () => { //es asincrono por lo tanto requiere de un async await 
    const collection = await Database(COLLECTION); //obtenemos una collection y recibe como parametro a donde nos queremos coenctar
    return await collection.find({}).toArray(); //consulta find para devolver los valores

}

const getByid = async (id)=>{
    const collection = await Database(COLLECTION);
    let obid =  ObjectId(id);
    return  await collection.findOne({ _id: obid}); //se recibe el parametro id
}

//crear un nuevo producto
const create = async(product) =>{
    console.log(`Hola ${product}`);
    const collection = await Database(COLLECTION);
    //creamos variable result
    let result = collection.insertOne(product) //recibe los datos del producto con insertOne
    return await result.insertedId; //devolvemos el identificador del objeto que se acaba de agregar
}

module.exports.ProductsService={ //agregamos propeidad product service
    getAll,
    getByid,
    create
}