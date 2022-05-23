const { MongoClient, ObjectId } = require ('mongodb');
const {normalize, denormalize, schema} = require('normalizr')

const mongo_url = 'mongodb+srv://hernancba:arenDaz2104@cluster0.y4ets.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 5000 });

client.connect();

class Mensaje {

    constructor (){
        this.collection = client.db("Cluster0").collection("mensajes")
    }

    /**
     * @Objetivo: Devolver todos los mensajes
     */
    async getMensajes() {
        try{
            return await this.collection.find().toArray()
        }
        catch(error){
            console.error(`${error}`);
        }
    }


    //Agregar mensajes a la DB
    async insertMensaje (objMensaje) {

        try{
            await this.collection.insertOne(objMensaje);            
            console.log("El mensaje fue agregado con exito a la base de datos MONGO")
        }
        catch(error){
            console.error(`${error}`);
        }
    }

    //Agregar mensajes a la DB
    async normalizar () {

        try{
            const arrayAutores =  await client.db("coderhouse").collection("autores").find().toArray();
            const arrayMensajes =  await client.db("coderhouse").collection("mensajes").find().toArray();

            const chat = {
                id: 1,
                autor: arrayAutores,
                mensajes: arrayMensajes              
            }

            console.log(chat)

            const autorSchema = new schema.Entity('autor')
            const mensajeSchema = new schema.Entity('mensajes')

            const chatSchema = new schema.Entity('chat',{
                autor: [autorSchema],
                mensajes:[mensajeSchema]
            })

            const normalizeObj = normalize(chat, chatSchema);

            // Muestra por pantalla el objeto original
            const util = require('util')
            function print(objeto) {
                console.log(util.inspect(objeto,false,12,true))
            }

            console.log("//-- Estructura del objeto normalizado --//")
            print(normalizeObj);

            console.log("//-- Cantidad original --//")
            console.log(JSON.stringify(chat).length);

            console.log("//-- Cantidad normalizado --//")
            console.log(JSON.stringify(normalizeObj).length);

            console.log("//-- Cantidad desnormalizado --//")
            const denormalizeObj = denormalize(normalizeObj.result, chatSchema, normalizeObj.entities);
            console.log(JSON.stringify(denormalizeObj).length);


            console.log("//-- Compresion --//")
            console.log((JSON.stringify(normalizeObj).length*100)/JSON.stringify(chat).length);

            return normalizeObj

        }
        catch(error){
            console.error(`${error}`);
        }
    }

}

module.exports = Mensaje;