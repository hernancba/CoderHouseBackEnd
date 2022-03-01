const knex = require("knex");

//Clase de productos para Base de datos
class cl_Mensaje {

    #conexionDB; //para crear y cerrar conexiones en cada metodo

    constructor (datosConexion, table){
        this.datosConexion = datosConexion;
        this.tabla = table;
    }


    //crear tabla Productos    
    async crearTablaMensajes() {

        console.log("crearTablaMensajes - Inicio")

        try {
            this.#conexionDB = knex(this.datosConexion);
            let conex = this.#conexionDB;
            let table = this.tabla

            console.log("crearTablaMensajes si no existe")

            await conex.schema.hasTable(table).then(async function (exists) {
                if (!exists) {

                    console.log("La tabla MENSAJES NO existe, la crearemos");

                    await conex.schema.createTable(table, function (campo) {
                        campo.increments("id").primary().notNullable();
                        //campo.string("idSocket");
                        campo.string("email");
                        campo.string("fecha");
                        campo.string("mensaje");
                    });

                } else {
                    console.log("La tabla MENSAJES ya existe, no fue creada")
                }
            });
        }
        catch (error) {
            console.error(`${error}`);
        }
        finally {
            this.#conexionDB.destroy();
        }
    }

    //devuelve todos los productos
    async getMensajes() {

        //console.log("getProductos - INICIO")
        try {
            this.#conexionDB = knex(this.datosConexion);
            let rtaBD = await this.#conexionDB(this.tabla)
            return rtaBD;
        }
        catch (error) {
            //console.error(error.sqlMessage);
            //console.error(error.sql);
            console.error(`${error}`);
        }
        finally {
            this.#conexionDB.destroy();
        }
    };

    //agregar el mensaje a la base de datos
    async insertMensaje(objMensaje) {
        console.log("insertMensaje - INICIO")

        try{
            this.#conexionDB=knex(this.datosConexion);
            let rtaBD = await this.#conexionDB(this.tabla).insert(objMensaje);
            console.log(`El producto fue agregado con exito y generó el id producto: ${rtaBD}`);
            return rtaBD;
        }
        catch(error){
            console.error(`${error}`);
        }
        finally{
            this.#conexionDB.destroy();
        }

    }

}




module.exports = cl_Mensaje;