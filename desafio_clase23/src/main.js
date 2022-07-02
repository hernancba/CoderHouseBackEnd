import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import config from './config.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './Routers/web/auth.js'
import homeWebRouter from './Routers/web/home.js'
import productosApiRouter from './Routers/api/Productos.js'

import addProductosHandlers from './Routers/ws/Productos.js'
import addMensajesHandlers from './Routers/ws/Mensajes.js'

// Instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

// Configuro el socket

io.on('connection', async socket => {
    addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
});

// Configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(session({
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cnxStr }),
    secret: '123456',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))


//Rutas del servidor API REST

app.use(productosApiRouter)


//Rutas del servidor web

app.use(authWebRouter)
app.use(homeWebRouter)


//Inicio el servidor

const connectedServer = httpServer.listen(config.PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
