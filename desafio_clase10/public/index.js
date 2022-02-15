const socket = io(); // Ahora podemos empezar a usar los sockets desde el cliente

//Funciones
//GetData --> Devuelve un objeto con todos los productos 
async function getData (url) {
    console.log("INICIO getData")
    try{
        const rtaFech = await fetch(url);
        if (!rtaFech.ok){
            throw{error: rtaFech.status, statusText: rtaFech.statusText}
        }
        let rtaObjeto = await rtaFech.json();
        return rtaObjeto;
    }
    catch(error){
        console.error(error)
    }
  }

//Postdata --> Devuelve un objeto con el producto nuevo + id asignado.
async function postData (url,data) {
    console.log("INICIO postData");
    console.log("postData: llamada por fetch a POST url");
    try{
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: "POST",  // Puede ser GET, PUT, PATCH, etc
      headers: { "Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify(data) 
    });
    let respuesta = await response.json();
    console.log("postData: Respuesta con id asignado al producto");
    console.log(respuesta);
    return respuesta.error != undefined ?  respuesta : {error: "Error en postData al agregar el nuevo producto"};
    }
    catch(error){
        console.error(error);
    }
  }

//Agregar mensaje --> boton agregar producto ---> obtiene datos del form, llama posdata y manda mensaje al Server.js y vacia form
async function addMessage(e){
    console.log("Inicio addMessage");
    //Cancela evento del submit
    e.preventDefault(); 
    // Obtengo los datos ingresados en el formulario
    let nuevoMensaje = {
        title: document.getElementById("nombre").value,
        price: document.getElementById("precio").value,
        thumbnail: document.getElementById("fotoUrl").value
    };
    console.log("addMessage: Obtengo los datos del nuevo producto:");
    console.log(nuevoMensaje)
    //llamo a fx postData para que me genere id al nuevo producto
    console.log("addMessage: Llamada a la funcion postData");
    let rtaAgregarProducto = await postData('api/productos', nuevoMensaje);
    rtaAgregarProducto != null ? socket.emit("msgNuevoProducto", {status: "ok"}) : socket.emit("msgNuevoProducto", {status: "no ok"});
    //borro los datos del formulario y lo vuelvo a dejar vacio
    document.getElementById("nombre").value="";
    document.getElementById("precio").value="";
    document.getElementById("fotoUrl").value="";
}

//Render listado de productos --> Actualiza listado de productos
function renderListadoProductos(data){
    console.log("INICIO renderListadoProductos (index.js): actualizar listado productos en pantalla")
    console.log(data);
    let html
    if (data.length != 0 ) {
        html = `<table>
        <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Foto</th>
        </tr>`
        html = html + data.map(function(elem, index){
            return(`
            <tr>
            <td>${elem.title}</td>
            <td>${elem.price}</td>
            <td><img src="${elem.thumbnail}" width=150 height=80></td>
            </tr>
            `)
        }).join(" ");    
        html = html + `</table>`
    }else{
        html = "No hay ningun producto dado de alta."
    }

    document.getElementById("listadoProductos").innerHTML = html;
}


//Detecta cuando clickean el boton submit con id=altaProducto
window.addEventListener("DOMContentLoaded", async () => {    
    console.log("LOG addEventListener: inicio") 
    let altaProducto = document.getElementById("altaProducto");
    altaProducto.addEventListener("click", addMessage);    
})
  

// Cliente
socket.on('msgTodosProductos', data => {
    console.log("INICIO socket.on - msgTodosProductos (index.js)");
    console.log("listado productos: ");
    console.log(data);
    console.log("Actualizar datos del listado");
    renderListadoProductos(data);
})





