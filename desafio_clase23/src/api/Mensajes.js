import config from '../config.js'

import ContenedorArchivo from '../Contenedores/ContenedorArchivo.js'

const mensajesApi = new ContenedorArchivo(`${config.fileSystem.path}/mensajes.json`)

export default mensajesApi