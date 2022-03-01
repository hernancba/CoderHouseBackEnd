const express = require("express");
const { sendFile } = require("express/lib/response");
const router = express.Router();

const cl_Carrito = require("../modules/cl_Carrito"); //importo la clase cl_Carrito
const Carrito = new cl_Carrito();

//GET '/api/carritos' -> devuelve todos los carritos 
router.get("/",(req, res)=>{
    res.status(200).json(Carrito.getCarritos()); 
});


//GET '/api/carritos/:id/productos' -> devuelve todos los productos de un carrito
router.get("/:idCarrito/productos",(req, res)=>{
    //obtengo el id recibido por parametro
    let idCarrito = parseInt(req.params.idCarrito);

    //valido que el id ingresado sea numerico
    if ( !isNaN(idCarrito) ){
        let objProductosCarritoId = Carrito.getProductosCarritoById(idCarrito);
        objProductosCarritoId != null ? res.status(200).json(objProductosCarritoId): res.status(406).json({error:`No se encontró el carrito con id: ${idCarrito}`});
    }else{
        res.status(404).json({error:'El id ingresado no es numerico'});
    }    
});

//POST '/api/carritos' -> crea un carrito y devuelve el id asignado
router.post("/",(req,res)=>{
    console.log("LOG router.post (carritos.js): INICIO ");
    let objProductosCarrito = {...req.body};
    let objCarritoNuevo = Carrito.setCarrito(objProductosCarrito);
    console.log(objCarritoNuevo);
    objCarritoNuevo != null ? res.status(200).json(objCarritoNuevo) : res.status(406).json({error:'Error al querer crear el nuevo carrito'});
});

//POST '/api/carrito/:id/productos' -> recibe y agrega un producto al carrito indicado x el body
router.post("/:idCarrito/productos",(req,res)=>{
    //obtengo el id recibido por parametro
    let idCarrito = parseInt(req.params.idCarrito);
    let objProductosCarritoBody = {...req.body};

    //actualizo los datos del producto del id recibido
    Carrito.agregarProductoCarrito(idCarrito,objProductosCarritoBody) ? res.status(200).json({status:`El producto con Id ${objProductosCarritoBody.idProducto} fue agregado al carrito correctamente.`}) : res.status(406).json({error:`No se encontró el carrito con id: ${idCarrito}`});
});

//DELETE '/api/carrito/:id/productos' -> recibe y elimina un producto al carrito indicado x el body
router.delete("/:idCarrito/productos/:idProducto",(req,res)=>{
    //obtengo el id recibido por parametro
    let idCarrito = parseInt(req.params.idCarrito);
    let idProducto = parseInt(req.params.idProducto);

    //actualizo los datos del producto del id recibido
    Carrito.eliminarProductoCarrito(idCarrito,idProducto) ? res.status(200).json({status:`El producto con Id ${idProducto} fue eliminado del carrito correctamente.`}) : res.status(406).json({error:`No fue posible eliminar el producto. El id carrito ${idCarrito} y/o el id producto: ${idProducto} no existe`});
});

//DELETE '/api/carrito/:id' -> elimina un carrito según su id.
router.delete("/:idProducto",(req,res)=>{
    //obtengo el id recibido por parametro
    let idProducto = parseInt(req.params.idProducto);
    
    //elimino producto con id enviado como parametro
    Carrito.deleteProducto(idProducto) ? res.status(200).json({status:`El carrito con Id ${idProducto} fue eliminado correctamente.`}) : res.status(406).json({error: `No se encontró el producto con id: ${idProducto}`});
});

module.exports = router;