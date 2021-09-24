var localStorageKeyName = 'clientes'; 
loadFromLocalStorage(); 

function loadFromLocalStorage(){ /*Esta funcion crea las filas, celdas para mostrar la info*/ 
    var gridBody = document.querySelector("#grid tbody"); /*Selecciona la tabla que se quiere editar*/ 
    var clientes = []; /*Arreglo para almacenar los datos del localstorage*/
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); //cadena
    console.log(dataInLocalStorage);
  
    if(dataInLocalStorage !== null){ /*Si hay datos, se van almacenando*/
        clientes = JSON.parse(dataInLocalStorage); 
    }
    gridBody.innerHTML = ''; 
   
    clientes.forEach(function(x,i) {
      var tr = document.createElement("tr"), 
          tdCheck = document.createElement("td"),
          inputCheck = document.createElement("input"),
          tdNombre = document.createElement("td"),
          tdDireccion = document.createElement("td"),
          tdEmail = document.createElement("td"),
          tdTelefono = document.createElement("td"),
          tdCotizaciones = document.createElement("td"),
          tdOrdenes = document.createElement("td")
    
    inputCheck.type = 'checkbox';      
    tdCheck.appendChild(inputCheck);

    //Agregar el contenido almacenado en el repositorio sobre el elemento que se acaba de crear
    tdNombre.innerHTML = x.nombre + " "+ x.apellido; //Se accede al atributo name del objeto x
   
    tdDireccion.innerHTML = x.direccion; 
    tdEmail.innerHTML = x.email; 
    tdTelefono.innerHTML = x.telefono; 
    tdCotizaciones.innerHTML = "Ver cotizaciones";
    tdOrdenes.innerHTML = "Ver ordenes";

     tr.appendChild(tdCheck);
     tr.appendChild(tdNombre);
     tr.appendChild(tdDireccion); 
     tr.appendChild(tdEmail); 
     tr.appendChild(tdTelefono); 
     tr.appendChild(tdCotizaciones); 
     tr.appendChild(tdOrdenes); 
     gridBody.appendChild(tr);
   });
}

//Buscar
var buscar = document.getElementById("input_buscar");
buscar.addEventListener("input", function () {

    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function (item) { //Recorre c/u de los tr de la tabla. La primera vez que entra recorre la prima fila que corresponde al nombre
                                                // de cada columna, por eso es que más adelante, en la primera iteracion aparece undefined, porque no hay tds en esa fila   
        let val = buscar.value;
        let re = new RegExp(val, 'gi'); //global insensitive*/
        var selected = item.getElementsByTagName("td");
        console.log(selected[1]); //La primera vez es indefinido 

        if (typeof selected[1] != "undefined") { //Entra todas las veces, menos en la primera porque SÍ es indefinido ya que en la primera fila NO hay td
            if (selected[1].innerText.match(re)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        }
    });
});