const normaliz = require("normalizr");

const normalize = normaliz.normalize;
const denormalize = normaliz.denormalize;
const schema = normaliz.schema;

const originalData = {
    id: "999",
    posts : [
        {
            id:"123",
            author : {
                id: "1",
                nombre: "juan",
                apellido: "riquelme"
            },
            titulo: "Elige tu propia aventura",
            comments : [
                {
                id: "324",
                commenter: {
                    id: "2",
                    nombre: "Sergio",
                    apellido: "Ramos"
                }
                },{
                id: "325",
                commenter: {
                    id: "3",
                    nombre: "Diego",
                    apellido: "Maradona"
                }
            }]
        },{
            id:"1123",
            author : {
                id: "2",
                nombre: "Sergio",
                apellido: "Ramos"
            },
            titulo: "Elige tu propia aventura 2",
            comments : [
                {
                id: "1324",
                commenter: {
                    id: "1",
                    nombre: "juan",
                    apellido: "riquelme"
                }
                },{
                id: "1325",
                commenter: {
                    id: "3",
                    nombre: "Sergio",
                    apellido: "Ramos"
                }
            }]
        },{
            id:"2123",
            author : {
                id: "3",
                nombre: "Sergio",
                apellido: "Ramos"
            },
            titulo: "Elige tu propia aventura 3",
            comments : [
                {
                id: "2324",
                commenter: {
                    id: "2",
                    nombre: "Sergio",
                    apellido: "Ramos"
                }
                },{
                id: "2325",
                commenter: {
                    id: "1",
                    nombre: "Juan",
                    apellido: "Riquelme"
                }
            }]
        },
    ],
}

//definimos un esquema de usuarios (autores y comentadores)
const user = new schema.Entity("users");
const comment = new schema.Entity("comments", {commenter: user});

//definimos un esquema de articulos 
const article = new schema.Entity("articles", {
    author: user,
    comments: [comment]
})

//Definimos un esquema de post (array de articulos)
const posts = new schema.Entity("post", {post: [article]})

//-----------------

const util = require("util")

function print(objeto){
    console.log(util.inspect(objeto,false,12,true))
}

console.log("//-- Objeto Original --//")
//print (originalData)
console.log(JSON.stringify(originalData).length)

console.log("//-- Objeto Normalizado --//")
const normalizeData = normalize(originalData, posts)
//print (normalizeData)
console.log(JSON.stringify(normalizeData).length)


console.log("//-- Objeto Desnormalizado --//")
const denormalizeData = denormalize(normalizeData.result, posts, normalizeData.entities)
//print (denormalizeData)
console.log(JSON.stringify(denormalizeData).length)

