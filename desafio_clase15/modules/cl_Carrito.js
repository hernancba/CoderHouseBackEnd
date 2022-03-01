//Clase CONTENEDOR que recibe el nombre del archivo
module.exports = class cl_Carrito {

    //array con los productos 
    static #arrCarritos = [
        {
            id: 1,
            productos: [
                {
                idProducto: 112,
                precioProducto: 12000,
                cantidad: 2,
                },
                {
                idProducto: 231,
                precioProducto: 11000,
                cantidad: 1,
                }
            ],        
        },
        {
            id: 2,
            productos: [
                {
                idProducto: 33,
                precioProducto: 12000,
                cantidad: 1,
                },
                {
                idProducto: 23,
                precioProducto: 12500,
                cantidad: 2,
                }
            ],        
        },
    ];

    //obtengo el máximo id (lo uso en setCarrito)
    #getMaxId(){
        return cl_Carrito.#arrCarritos.length === 0 ? 0 : cl_Carrito.#arrCarritos.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
    }

    //devuelve todos los carritos 
    getCarritos(){
        return  cl_Carrito.#arrCarritos.length === 0 ? null : cl_Carrito.#arrCarritos;
    }

    //devuelve el contenido de un carrito en particular 
    getProductosCarritoById(idCarrito){
        return idCarrito != undefined && typeof(idCarrito) === "number" ? cl_Carrito.#arrCarritos.find(carrito=> carrito.id === idCarrito): null;
    }

    //crea carrito y devuelve el id del carrito asignado 
    setCarrito(objProductosCarrito){
        let id = this.#getMaxId(); //obtengo el máximo id del array de carritos
        id++; //sumo en 1 para asginar al nuevo carrito      
        //armo el objetoCarritoNuevo
        let objCarritoNuevo =  {   
            id:id,
            productos: objProductosCarrito.productos,
        };
        cl_Carrito.#arrCarritos.push(objCarritoNuevo); // lo agrego a mi arrayCarritos
        return id; //  devuelvo id asignado  
    }

    //agrego un producto al carrito
    agregarProductoCarrito(idCarrito,objProducto){
        console.log("cl_Carrito.js: agregarProductoCarrito: INCIO")
        console.log("carrito: " + idCarrito)
        console.log(objProducto)

        if(objProducto.idProducto != undefined && idCarrito != undefined){
            console.log("validacion de datos OK")
            //busco la posicion en el array del carrito a modificar
            let posicionCarrito = cl_Carrito.#arrCarritos.findIndex(carrito=> carrito.id === idCarrito);
            
            //si la posicion existe (carrito existe) , actualizo
            if( posicionCarrito > -1){
                console.log(cl_Carrito.#arrCarritos[posicionCarrito])

                //valido si ya existe el producto
                let posicionProducto = cl_Carrito.#arrCarritos[posicionCarrito].productos.findIndex(producto=> producto.idProducto === objProducto.idProducto);
                
                if( posicionProducto > -1){ //existe, sumo cantidad en 1
                    console.log("El producto existe en el carrito, sumo cantidad en 1")
                    let cantidadActual = cl_Carrito.#arrCarritos[posicionCarrito].productos[posicionProducto].cantidad;
                    cl_Carrito.#arrCarritos[posicionCarrito].productos[posicionProducto].cantidad = cantidadActual + 1; 

                }else{ //no existe el producto, lo agrego
                    console.log("El producto no existe en el carrito, lo agrego")
                    
                    cl_Carrito.#arrCarritos[posicionCarrito].productos.push({
                        idProducto: objProducto.idProducto,
                        precioProducto: objProducto.precioProducto,
                        cantidad: 1,
                    })
                } 
                return true; // retorno OK la actualizacion
            }
        }
        console.log("validacion de datos ERROR")
        return false; // retorno false si no se cumple nada de lo anterior (ambos if)
    }

    //elimina un producto del carrito
    eliminarProductoCarrito(idCarrito,idProducto){
        console.log("cl_Carrito.js: eliminarProductoCarrito: INCIO")

        if(idCarrito != undefined && idProducto != undefined){
            console.log("validacion de datos OK")
            //busco la posicion en el array del carrito a modificar
            let posicionCarrito = cl_Carrito.#arrCarritos.findIndex(carrito=> carrito.id === idCarrito);
            
            //si la posicion existe (carrito existe) , actualizo
            if( posicionCarrito > -1){
                console.log(cl_Carrito.#arrCarritos[posicionCarrito])

                //valido si ya existe el producto
                let posicionProducto = cl_Carrito.#arrCarritos[posicionCarrito].productos.findIndex(producto=> producto.idProducto === idProducto);
                
                if( posicionProducto > -1){ //existe, lo elimino
                    console.log("El producto existe en el carrito, lo elimino")
                    cl_Carrito.#arrCarritos[posicionCarrito].productos.splice(posicionProducto, 1); 
                    return true; // retorno OK la actualizacion
                }else{ //no existe el producto, lo agrego
                    console.log("El producto no existe en el carrito, no fue posible eliminarlo.")
                    return false; // retorno ERROR la actualizacion
                }                 
            }
        }
        console.log("validacion de datos ERROR");
        return false; // retorno false si no se cumple nada de lo anterior (ambos if)
    }

    //elimina un carrito
    deleteProducto(idCarrito){

        if(idCarrito != undefined && typeof(idCarrito) === "number"){
            //obtengo la posicion en el arrayCarritos del id carrito ingresado como parametro
            let posicion = cl_Carrito.#arrCarritos.findIndex(element=> element.id === idCarrito);
            
            if( posicion > -1){
                cl_Carrito.#arrCarritos.splice(posicion,1); //borro producto
                return true; // retorno OK la eliminacion
            }
        }
        return false; // retorno false si no se cumple nada de lo anterior (ambos if)
    }
}

