//Obtenemos lso servivicios
const {ProductsService} = require('./services');
const debug = require('debug')("app:module=products-controller");
//funciones de los servicios de products
module.exports.ProductsController = {
    getProducts: async (req,res) => {
        try{
            let products= await ProductsService.getAll();
            res.json(products);
        }catch (error){
            debug(error);
            res.status(500).json({message: "Interval Server Error"});
        }
    },
    getProduct: async (req,res) => {
        try{
        const {params  = {id}} = req;
        let product = await ProductsService.getByid(id);
        res.json(product)
        }catch(error){ 
            debug(error);
            res.status(500).json({message: "Interval Server Error"});
        }
    },
    createProduct:async(req,res) => {
        try{
            const {body}= res;
            let insertId = await ProductsService.create(body);
            res.json(insertId);
        }catch(error){
            debug(error);
            res.status(500).json({message: "Interval Server Error"});
        }
    },
}