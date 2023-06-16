const { ObjectId } = require('mongodb');
//Traer el modulo de la database
const {Database} = require('../database');
//
const { ProductUtils } =require('./utils');
//funciones de manipulacion de datos
const COLLECTION = 'products'
const getAll = async () => { //es asincrono por lo tanto requiere de un async await 
    const collection = await Database(COLLECTION); //obtenemos una collection y recibe como parametro a donde nos queremos coenctar
    return await collection.find({}).toArray(); //consulta find para devolver los valores
}

const getByid = async (id)=>{
    const collection = await Database(COLLECTION);
    const obid = new ObjectId(id);
    return  await collection.findOne({ _id: obid}); //se recibe el parametro id usando la dependencia mongodb con ObjectId
}

//crear un nuevo producto
const create = async(product) =>{
    const collection = await Database(COLLECTION);
    //creamos variable result
    let result = await collection.insertOne(product) //recibe los datos del producto con insertOne
    return  result.insertedId; //devolvemos el identificador del objeto que se acaba de agregar
    
}

const generateReport = async (name,res)=>{
    let producs = await getAll(); //obtenemos la informacion del 
    ProductUtils.excelGenerator(producs,name,res);
}

const modifyUser = async (modifi) => {
    const collection = await Database(COLLECTION);
    /* let res = await collection.updateOne()   */
    console.log(modifi);
}

module.exports.ProductsService={ //agregamos propeidad product service
    getAll,
    getByid,
    create,
    generateReport,
    modifyUser
}