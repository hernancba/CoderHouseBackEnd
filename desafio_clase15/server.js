const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const productosRouter = require('./routes/productos');
const carritosRouter = require('./routes/carritos');
const mdw = require("./middlewares/mdw_url");

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritosRouter);
app.use(mdw.ruta_invalida);

//productos en MEMORIA
//const cl_Producto = require("./modules/cl_Producto_MEMORIA"); //importo la clase cl_Producto
//const Producto = new cl_Producto();

//productos en archivo de texto
//const cl_Producto = require("./modules/cl_Producto_TXT"); //importo la clase cl_Producto
//const Producto = new cl_Producto();

//productos en base de datos
const cl_Producto = require("./modules/cl_Producto_DB"); //importo la clase cl_Producto
const { isConstructorDeclaration } = require('typescript')

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

//creo la tabla productos
(async () => {
  try {
    await Producto.crearTablaProductos();
  } catch (err) {
    console.error(err);
  }
})();

//obtengo listado de productos
//let listadoProductos = Producto.getProductos();
let listadoProductos
(async () => {
  try {
    listadoProductos = await Producto.getProductos();
  } catch (err) {
    console.error(err);
  }
})();

const cl_Mensaje = require("./modules/cl_Mensaje"); //importo la clase cl_Mensaje

//const ProductoSqlite = new cl_Mensaje(
//  {
//    client: "sqlite3",
//    connection: { filename: "./DB/ecommerce.sqlite" },
//  },
//  "mensajes"
//);

const Mensaje = new cl_Mensaje(
  {
      client: "mysql",
      connection: {
          host: "127.0.0.1",
          database: "bdproductos",
          port: 3307,
      },
       pool: { min: 0, max: 7 },
  },
  "mensajes"
);

//creo la tabla mensajes
(async () => {
  try {
    await Mensaje.crearTablaMensajes();
  } catch (err) {
    console.error(err);
  }
})();

//obtengo listado de productos
//let listadoProductos = Producto.getProductos();
const date = new Date();
let listaMensajes = [{ //la creo para que tenga algo, despues sera pisada por la info de la base
  //idSocket:"inicio",
  email:"Admin",
  fecha: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
  mensaje: "Bienvenido al chat!!"
}];
(async () => {
  try {
    listaMensajes = await Mensaje.getMensajes();
  } catch (err) {
    console.error(err);
  }
})();




// (async () => {
//   try {
//     let rtaMetodo = await Producto.getMensajes();
//     console.log("mensajes actuales")
//     console.log(rtaMetodo)
//     listaMensajes.push(rtaMetodo)
//   } catch (err) {
//     console.error(err);
//   }
// })();




//abro conexion del lado del servidor
io.on("connection", (socket) => {  // connection no se puede modificar, va ese valor.
  // "connection" se ejecuta la primera vez que se abre una nueva conexión
  console.log('Usuario conectado')
  //envio datos al cliente (desde servidor)
  socket.emit('mensaje_inicio', listadoProductos) // (evento, msg)
  socket.emit('msgTodosMensajesCHAT', listaMensajes ) // (evento, msg)

  //LISTADO PRODUCTOS
  socket.on('mensaje_AltaProducto', data => {
    console.log("io.on sockek.on mensaje_AltaProducto: inicio (server.js):")
    if (data.estado != "OK") {
      console.log("El producto no fue dado de alta.")
    } else {
      console.log("El producto fue dado de alta correctamente.")
      //mando mensaje a todos los conectados para actualizar su listado de productos.
      io.sockets.emit('mensaje_inicio', listadoProductos);
    }
  })

  //CHAT
  socket.on('nuevoMensajeCHAT', data => {
    console.log("io.on sockek.on nuevoMensajeCHAT: inicio (server.js):")
    console.log(data);
    listaMensajes.push(data);
    console.log(listaMensajes);
    io.sockets.emit("msgTodosMensajesCHAT", listaMensajes);

    Mensaje.insertMensaje(data)
             
    //gestorDataBase.insertElements(data)
    //.then(()=>gestorDataBase.selectAllElements()
    //.then(message=> console.log(message)));


  })

});

// El servidor funcionando en el puerto 8080
const PORT = process.env.PORT || 8080  // si no indico puerto cuando ejecuto, entonces pone 8080--> PORT=3000 node start
httpServer.listen(PORT, () => console.log('SERVER ON'))