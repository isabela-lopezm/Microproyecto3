var localStorageKeyName = 'compras'; 
loadFromLocalStorage(); 

function loadFromLocalStorage(){ /*Esta funcion crea las filas, celdas para mostrar la info*/ 
    var gridBody = document.querySelector("#grid tbody"); /*Selecciona la tabla que se quiere editar*/ 
    var compras = []; /*Arreglo para almacenar los datos del localstorage*/
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); //cadena
    //console.log(dataInLocalStorage);
  
    if(dataInLocalStorage !== null){ /*Si hay datos, se van almacenando*/
        compras = JSON.parse(dataInLocalStorage); /*users es un  arreglo de objeto*/ 
    }
    gridBody.innerHTML = ''; /*Poner en blanco el tbody de la tabla grid*/
    for (i = 0; i < compras.length; i++) {
        compras[i].productos.forEach(function(x,i){

      var tr = document.createElement("tr"),
          tdCheck = document.createElement("td"),
          inputCheck = document.createElement("input"),
          tdCodigo = document.createElement("td"),
          tdNombre = document.createElement("td"),
          tdCategoria = document.createElement("td"),
          tdPrecioin = document.createElement("td"),
          tdPreciout = document.createElement("td"),
          tdUbicacion = document.createElement("td"),
          tdPresentacion = document.createElement("td")

    inputCheck.type = 'checkbox';      
    tdCheck.appendChild(inputCheck);

    //Agregar el contenido almacenado en el repositorio sobre el elemento que se acaba de crear
    tdCodigo.innerHTML = x.codigo; //Se accede al atributo name del objeto x
    tdNombre.innerHTML = x.nombreprod;
    tdCategoria.innerHTML = x.categoria; 
    tdPrecioin.innerHTML = x.precioin; 
    tdPreciout.innerHTML = x.preciout; 
    tdUbicacion.innerHTML = x.ubicacion;
    tdPresentacion.innerHTML = x.pres;

     tr.appendChild(tdCheck);
     tr.appendChild(tdCodigo);
     tr.appendChild(tdNombre); //Para agregar el elemento a la columna
     tr.appendChild(tdCategoria); 
     tr.appendChild(tdPrecioin); 
     tr.appendChild(tdPreciout); 
     tr.appendChild(tdUbicacion); 
     tr.appendChild(tdPresentacion); 
     gridBody.appendChild(tr);
    });
}
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
        //console.log(selected[1]); //La primera vez es indefinido 
        if (typeof selected[1] != "undefined") { //Entra todas las veces, menos en la primera porque SÍ es indefinido ya que en la primera fila NO hay td
            if (selected[1].innerText.match(re)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        }

    });
});