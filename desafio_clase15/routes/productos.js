const express = require("express");
const { sendFile } = require("express/lib/response");
const router = express.Router();

//productos en base de datos
const cl_Producto = require("../modules/cl_Producto_DB"); //importo la clase cl_Producto

const Producto = new cl_Producto(
  {
      client: "mysql",
      connection: {
          host: "127.0.0.1",
          database: "bdproductos",
          port: 3307,
      },
       pool: { min: 0, max: 7 },
  },
  "productos"
);
// const ProductoSqlite = new cl_Producto(
//  {
//    client: "sqlite3",
//    connection: { filename: "./DB/mydb.sqlite" },
//  },
//  "productos"
// );


//GET '/api/productos' -> devuelve todos los productos
router.get("/", async (req, res)=>{
    
    console.log("router.get - INICIO");
    res.status(200).json(await Producto.getProductos());
    
});


//GET '/api/productos/:id' -> devuelve un producto según su id.
router.get("/:idProducto",async (req, res)=>{
    console.log("router.get x idProducto - INICIO");

    //obtengo el id recibido por parametro
    let idProducto = parseInt(req.params.idProducto);

    //valido que el id ingresado sea numerico
    if ( !isNaN(idProducto) ){        
        let rtaClase = await Producto.getProductoById(idProducto);
        rtaClase != null ? res.status(200).json(rtaClase): res.status(400).json({error:'El producto no fue encontrado'});
    }else{
        res.status(404).json({error:'El id ingresado no es numerico'});
    }    

});

//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado
router.post("", async (req,res)=>{

    console.log("LOG router.post (productos.js): inicio ");

    let objProductoBody = {...req.body};

    let objProductoNuevo =  await Producto.setProducto(objProductoBody) 
    if(objProductoNuevo!=null){
        //req.app.io.sockets.emit('mensaje_inicio',await Producto.getProductos());
        res.status(200).json(objProductoNuevo)
    }else{
        res.status(404).json({error:'Error al dar de alta el/los producto/s'});
    }   

 });

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put("/:idProducto",async (req,res)=>{
    //obtengo el id recibido por parametro
    let idProducto = parseInt(req.params.idProducto);
    let objProductoBody = {...req.body};

    let rtaClase = await Producto.updateProducto(idProducto,objProductoBody)
    if(rtaClase){
        //req.app.io.sockets.emit("mensaje_inicio",await Producto.getProductos());
        res.status(200).json({status:`OK`,message:`El producto con Id ${idProducto} fue actualizado correctamente.`});
    }else{
        res.status(406).json({error:`No se encontró el producto con id: ${idProducto}`});
    }

});

//DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete("/:idProducto", async(req,res)=>{
    
   //obtengo el id recibido por parametro
   let idProducto = parseInt(req.params.idProducto);
  
    let rtaClase = Producto.deleteProducto(idProducto);
    if(rtaClase){
        //req.app.io.sockets.emit("actualizarListadoProductos",await Producto.getProductos());
        res.status(200).json({status:`OK`,message:`El producto con Id ${idProducto} no existia o fue eliminado correctamente`});
    }else{
        res.status(406).json({error:`Error al querer borrar el producto`});
    }

});

module.exports = router;