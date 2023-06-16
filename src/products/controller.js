//Obtenemos lso servivicios
const { ProductsService } = require("./services");
const debug = require("debug")("app:module=products-controller");
//Exportamos response para generar las respuestas de error 
const {Response} = require('../common/response');
//modulo de httperror
const createError = require('http-errors');
//funciones de los servicios de products
module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      Response.success(res, 200, "Lista de Productos", products); //Enviamos los parametros de respuesta 
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      const { params : { id } } = req;
      let product = await ProductsService.getByid(id);
        if(!product){
            Response.error(res, new createError.NotFound());
        }else{ 
            Response.success(res, 200, `Prdocuto ${id}`, product); //Enviamos los parametros de respuesta 
        }
    }catch (error) {
        debug(error);
        Response.error(res);
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body, params: id } = req;
      let prod = await ProductsService.getByid(id);
        if(!body || Object.keys(body).length === 0 || !prod){
            Response.error(res, new createError.BadRequest());
        }else{
            let insertId = await ProductsService.create(body);
            Response.success(res, 201, `Producto Agregado`, insertId);
        }
    } catch (error) {
      debug(error);
      Response.error(res);    
    }
  },
  //update
  updateProduct: async(req, res) =>{
      try{
        const {body} = req;
        if(!body || Object.keys(body).length ===0){
          Response.error(res, new createError.BadRequest());
        }else{ 
          let modifi = await ProductsService.modifyUser(body);
          Response.success(res, 200, `Producto modificado`,modifi);
        }
      }catch(error){ 
        debug(error);
        Response.error(res);
      }
  },
  //delete
  generateReport:  async(req,res) => {
    try{
        ProductsService.generateReport('Inventario', res)
    }catch(error){
      debug(error);
      Response.error(res);  
    }
  },


}; 
