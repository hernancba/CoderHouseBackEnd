module.exports = class class_Producto {

    constructor(id, timestamp, nombre, descripcion, codigo, foto, precio, stock){
        this.id = id;
        this.timestamp=timestamp;
        this.nombre=nombre;
        this.descripcion=descripcion,
        this.codigo=codigo;
        this.foto=foto;
        this.precio=precio,
        this.stock=stock;
    };
    

    static arrayProductos = [
        {
            id: 1,
            timestamp: "2022/02/01 18:00:00",
            nombre: "Pinza",
            descripcion: "Pinza de fuerza",
            codigo: "H0001",
            foto: "../public/images/pinza.jpg",
            precio: 1500,
            stock: 10,
        },
        {
            id: 2,
            timestamp: "2022/02/01 18:00:00",
            nombre: "Alicate",
            descripcion: "Max diametro de corte 1mm de alambre de cobre",
            codigo: "H0002",
            foto: "../public/images/alicate.png",
            precio: 1200,
            stock: 10,
        },
        {
            id: 3,
            timestamp: "2022/02/01 18:00:00",
            nombre: "Detornillador Plano",
            descripcion: "Pinza de fuerza",
            codigo: "H0003",
            foto: "../public/images/destornillador.png",
            precio: 800,
            stock: 15,
        },
       
    ];
  

    getById(id){

        let idProducto = class_Producto.arrayProductos.find(producto=> producto.id === id);

        return idProducto;
    };

    getMaxId(){
        return class_Producto.arrayProductos.length === 0 ? 0 : class_Producto.arrayProductos.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
    }

    listarProductos(){
        
    return class_Producto.arrayProductos;

    }

    validar(producto){
        if(producto.timestamp != undefined && producto.nombre != undefined && producto.descripcion != undefined && producto.codigo
            != undefined && producto.foto != undefined && producto.precio != undefined && producto.stock !=undefined) {
                return true;
            }
            else {
               return  false;
            }
    }

    agregarProducto(producto){
            if(this.validar(producto)){
            let id = this.getMaxId(); //obtengo el máximo id del array de productos
            id++; //sumo en 1 para asginar al nuevo producto            
            producto.id = id; //asigno id al nuevo producto

            let nuevoProducto={

            id:producto.id,
            timestamp:producto.timestamp,
            nombre:producto.nombre,
            descripcion:producto.descripcion,
            codigo:producto.codigo,
            foto:producto.foto,
            precio:producto.precio,
            stock:producto.stock
            
            };
        class_Producto.arrayProductos.push(nuevoProducto);
        
        return nuevoProducto;
    }
            else { 
                    return "No se pudo agregar"
                }
    }

    eliminarProducto(id){

     let productToDelete= class_Producto.arrayProductos.findIndex(item=> item.id===id);
     class_Producto.arrayProductos.splice(productToDelete,1);
    
    }

    updateProducto(id,producto){

        if(this.validar(producto)){
     
            let posicion = class_Producto.arrayProductos.findIndex(item=> item.id === id);
            //Si la posicion existe, se actualiza
            if( posicion > -1){
                //borro producto actual (no modificado)
                class_Producto.arrayProductos.splice(posicion,1);
                //agrego producto modificado
                class_Producto.arrayProductos.push(
                    {   
                        id:producto.id,
                        codigo:producto.codigo,
                        fechaHora:producto.fechaHora,
                        nombre:producto.nombre,
                        descripcion:producto.descripcion,
                        precio:producto.precio,
                        imagenURL:producto.imagenURL,
                        stock:producto.stock,
                    })
                }
                
                return true;
            }
            return false;
        }
        
       
        
};


    












