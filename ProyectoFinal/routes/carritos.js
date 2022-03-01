let express = require('express')
const { arrayCarritos } = require('../public/javascripts/class_Carrito')
let router = express.Router()
const class_Carrito = require('../public/javascripts/class_Carrito')
const Carrito = new class_Carrito()

//Crea nuevo carrito, y lo devuelve con su id
router.post("/", (req, res) => {
   
    res.status(200).json(Carrito.setCarrito()) 
})

//Devuelve listado de todos los carritos
router.get("/", (req, res)=> {
    res.status(200).json(Carrito.listarCarritos())
})

//Busca carrito por id
router.get("/:id",(req,res)=>{
    let id = parseInt((req.params.id))
    res.status(200).json(Carrito.getById(id))
})

//Agregar productos al carrito por su id de producto
router.post("/:id/productos", (req, res) => {
    let idProducto =parseInt((req.params.id));
    let jsonCarrito = {...req.body}
    Carrito.addProductoCarrito(idProducto, jsonCarrito) ? res.status(200).json({mensaje: "Producto agregado correctamente"}) : res.status(417).json({mensaje: "Producto no encontrado"})
})

//Elimina un carrito
router.delete("/:id", (req,res)=>{
    let id=parseInt((req.params.id));
    Carrito.elimiarCarrito(id) ? res.status(200).json({mensaje:`Carrito id: ${id} eliminado correctamente`}) : res.status(417).json({mensaje: "Carrito no encontrado"})
})

//Elimina un producto del carrito por su id de carrito y de producto
router.delete("/:id/productos/:idProducto", (req, res)=>{
    let idCarrito = parseInt(req.params.id)
    let idProducto = parseInt(req.params.idProducto)
    Carrito.eliminarProductoCarrito(idCarrito,idProducto) ? res.status(200).json({mensaje: `Prducto id ${idProducto} eliminado correctamente del carrito id ${idCarrito} `}) : res.status(417).json({mensaje: "No se pudo eliminar el producto del carrito"})
})

//Lista todos los productos de un carrito
router.get("/:id/productos", (req, res)=>{
    let idCarrito = parseInt((req.params.id))
    res.status(200).json(Carrito.listadoProductosCarrito(idCarrito))
})




module.exports= router;

