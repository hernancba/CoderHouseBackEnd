const express = require("express");
const { sendFile } = require("express/lib/response");
const router = express.Router();
const { faker } = require("@faker-js/faker");

const Producto = require("../modules/Producto"); //Import Product class
const Producto = require("../modules/Producto"); 
const { isConstructorDeclaration } = require("typescript");
const Producto = new cl_Producto();
const ProductoMongo = new cl_ProductoMongo();

const getFormatoAleatorio = id => ({
    id,
    title: faker.name.firstName(),
    price: faker.finance.amount(),
    thumbnail: faker.image.avatar()
})

//GET '/api/productos' -> devuelve todos los productos 
router.get("/",(req, res)=>{
    res.status(200).json(Producto.getProductos()); 
});

//GET '/api/productos/mostrarTodos' -> muetra todos los documentos de la coleccion PRODUCTOS de la base de datos MONGO
router.get('/mostrarTodos', async (req, res) => {
    console.log("entro a router.get /productosMongo");
    res.status(200).json( await ProductoMongo.getProductos()); 
})

//GET '/api/productos/mostrarCincoAleatorios' - genera 5 casos aleatorios de PRODUCTOS con faker y los muestra, pero no los guarda
router.get('/mostrarCincoAleatorios', (req, res) => {
    //const numeroElementos = req.query.cant || 5
    const numeroElementos = 5
    const listadoProductosAleatorios = []
    console.log("entro al router GET /productos-test")
    for (let i=0; i < numeroElementos; i++){
        listadoProductosAleatorios.push(getFormatoAleatorio(i))
    }
    res.status(200).json(listadoProductosAleatorios)
})

//GET '/api/productos/agregarCincoAleatorios' -> genera 5 casos aleatorios de PRODUCTOS con faker, los muestra y guarda en la base de datos MONGO
router.get("/agregarCincoAleatorios",async (req,res)=>{
    console.log("entro a router.get /productosMongo");
    res.status(200).json( await ProductoMongo.addProductosAleatorios()); 
});


module.exports = router;