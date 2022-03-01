module.exports= class class_Carrito {
    
    static arrayCarritos = [
        {
            id:1,
            productos:[
                {
                    idProducto:1,
                    cantidad:4
                },
                {
                    idProducto:2,
                    cantidad:10
                }
            ],
        },
        {
            id:2,
            productos:[
                {
                    idProducto:4,
                    cantidad:10
                },
                {
                    idProducto:2,
                    cantidad:10
                }
                
            ]
        }
    ]

    getById(id){

        let idCarrito = class_Carrito.arrayCarritos.find(item=> item.id === id);

        return idCarrito
    };

    getUltimoId(){
        return class_Carrito.arrayCarritos.length === 0 ? 0 : class_Carrito.arrayCarritos.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
    }

    listarCarritos(){
        
    return class_Carrito.arrayCarritos;

    }

    validar(idProducto, idCarrito){
        if(idProducto != undefined && idCarrito !=undefined) {
                return true;
            }
            else {
               return false;
            }
    }

    setCarrito(){
        let id=this.getUltimoId();
        id++;
        let nuevoCarrito ={
            id:id,
            productos:[{}]
        };

        class_Carrito.arrayCarritos.push(nuevoCarrito);
        return nuevoCarrito;
    }

    addProductoCarrito(idProd, carrito){
        console.log("class_Carrito.js: agregarProductoCarrito: INCIO")
        console.log("El producto agregar: " + idProd)
        console.log(carrito)
            if(this.validar(idProd, carrito)){
            let posicion= class_Carrito.arrayCarritos.findIndex(item => item.id === carrito.id);
            class_Carrito.arrayCarritos[posicion].productos.push({
                idProducto:idProd,
                cantidad:1
            })
            return true;
        }
        return false;
    }

    //Eliminar producto segun su id, del carrito
    eliminarProductoCarrito(idProducto, carrito){
        if(this.validar(idProducto, carrito)){
         let productToDelete= class_Carrito.arrayCarritos.findIndex(item=> item.id===carrito);
         class_Carrito.arrayCarritos[productToDelete].productos.push({
            idProducto: idProducto,
            cantidad: 0,
        })
        
            return true
        }
            return false
    }

     //Eliminar un carrito
     elimiarCarrito(idCarrito){

            let index = class_Carrito.arrayCarritos.findIndex(item=> item.id === idCarrito);
            
            if(index > -1){
                class_Carrito.arrayCarritos.splice(index,1); //Elimino producto
                return true; 
            }
        
        return false; 
    }

    listadoProductosCarrito(idCarrito){
        
        let posicion = class_Carrito.arrayCarritos.findIndex(item=> item.id === idCarrito)
        let listado = class_Carrito.arrayCarritos[posicion].productos
        return listado;
    }
        
        
    

    
}