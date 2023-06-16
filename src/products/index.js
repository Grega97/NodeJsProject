const express = require("express");
const router = express.Router(); // nos permite manejar las rutas de nuestro modulo independientemente de la aplicacion
const {ProductsController} = require('./controller'); //solicitamos el controlador de las funciones


module.exports.ProductsAPI = (app) => { //trabajamso de manera independiente
  //recibimos aplicacion
    router
    .get("/", ProductsController.getProducts)
    .get("/report",ProductsController.generateReport) // http://localhost:3000/api/products
    .get("/:id", ProductsController.getProduct) // http://localhost:3000/api/products/23
    .post("/", ProductsController.createProduct)
    //rtuas para update
    .put("/:id",ProductsController.updateProduct);
    //rutas para delete
    app.use("/api/products",router); //expone nuestro router, agrega o dispone de las rutas get post etc.. 
};
