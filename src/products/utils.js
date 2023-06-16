//funciones para exportar
const excelGenerator = (products, name, res)=>{
    const xl = require('excel4node'); //usamos la dependencia dentro de la funcion para uso unico de esta funcion
    products = products.map((product)=>{ //aplicamos un map a los productos retornados por mongo
        let id = product._id.toString(); //convertirmos el Ojectid a string
        delete product._id//eliminamos una propiedad del objeto
        return {
            id,
            ...product
        }
    });

    let wb = new xl.Workbook(); //generamos un nuevo workbook con la dependencia
    let ws = wb.addWorksheet('Inventario');//generamos un nuevva hoja de trabajo

    for(let i=1; i<=products.length; i++){
        for(let j=1; j<=Object.values(products[0]).length; j++){
            let data = Object.values(products[i-1])[j-1];
            if(typeof data==='string' ){
                ws.cell(i,j).string(data);
            }else{ 
                ws.cell(i,j).number(data);
            }
        }
    }

        wb.write(`${name}.xlsx`,res);
}

module.exports.ProductUtils = {
    excelGenerator
}