import { normalize, schema, } from 'normalizr'

// Defino un esquema de autor
const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

// Defino un esquema de mensaje
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })

// Defino un esquema de posts
const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

const normalizarMensajes = (mensajesConId) => normalize({ id: 'mensajes', mensajes: mensajesConId }, schemaMensajes)

export { normalizarMensajes }