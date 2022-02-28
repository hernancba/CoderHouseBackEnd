const { json } = require('express');
var express = require('express');
var router = express.Router();
const class_Producto = require("../public/javascripts/class_Producto");
const Producto = new class_Producto();

// Todos los productos
router.get('/', function(req, res, next) {
  res.status(200).json(Producto.listarProductos());
});

//Producto por ID
router.get("/:id",(req, res)=>{
  let id = parseInt(req.params.id);

  if ( !isNaN(id) ){
      let objProductoId = Producto.getById(id);
      objProductoId != null ? res.status(200).json(objProductoId): res.status(406).json({error:`Producto con id: ${id} no encontrado`});
  }else{
      res.status(404).json({error:'El id ingresado no es numerico'});
  }    
});

//Agregar producto
router.post("/", (req, res) => {
  let jsonProductoNuevo=  {...req.body};
  console.log(jsonProductoNuevo);
  if(Producto.validar(jsonProductoNuevo)){
                Producto.agregarProducto(jsonProductoNuevo)
             }
                else {
                       res.status(404).send("Faltan datos")
                     };
    Producto.agregarProducto(jsonProductoNuevo);
    jsonProductoNuevo != null ? res.status(200).json({mensaje:`Se agrego producto corectamente`, producto: jsonProductoNuevo}) : res.status(406).json({error:'Error al querer agregar el nuevo producto'});
  
  
})

router.delete("/:id", (req,res)=> {
  let id=(req.params.id);
  Producto.eliminarProducto(id)
  res.status(200).json({mensaje:"Producto eliminado correctamente"})


})

router.put("/:id", (req, res)=> {
  let id = (req.params.id)
  let jsonProducto = {...req.body}
  Producto.updateProducto(id,jsonProducto) ? res.status(200).json({mensaje: "Producto modificado correctamente"}) : res.status(417).json({mensaje:"No se pudo actualizar el producto"})

})

module.exports = router;
