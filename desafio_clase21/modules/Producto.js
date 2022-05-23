const { MongoClient, ObjectId } = require ('mongodb');
const { faker } = require("@faker-js/faker");

const mongo_url = 'mongodb+srv://equipo9:Lj30sffXYx13Zy4V@cluster0.tferq.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 5000 });
client.connect();

class Producto {

    constructor (){
        this.collection = client.db("coderhouse").collection("productos")
    }
    
    /**
     * @Objetivo: Devolver todos los productos
     */
    async getProductos() {
        try{
            const array = await this.collection.find().toArray()
            return array
        }
        catch(error){
            console.error(`${error}`);
        }
    }

    
    async addProductosAleatorios () {

        try{
            let nombre 
            let precio 
            let foto 
            let producto

            //Generacion de datos aleatorios, luego se uno x uno 
            for (let i = 0; i < 5; i++) {
            nombre = faker.name.firstName();
            precio = faker.finance.amount(); 
            foto = faker.image.avatar();
            producto = {
                    id: i,
                    title: nombre,
                    price: precio,
                    thumbnail: foto,
                }
            //-- Guardar en DB --//
            await this.collection.insertOne(producto);
            }
            console.log("Los 5 productos aleatorios fueron agregados con éxito en la base de datos MONGO")
        }
        catch(error){
            console.error(`${error}`);
        }
    }
}

module.exports = Producto;