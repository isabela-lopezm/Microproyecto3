var localStorageKeyName = 'clientes'; 
loadFromLocalStorage(); 

document.querySelector('#btn-guardar').addEventListener("click",function(){

    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var direccion = document.getElementById("direccion");
    var email = document.getElementById("email");
    var telefono = document.getElementById("telefono");

   expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(nombre.value.length === 0 || apellido.value.length === 0 || direccion.value.length === 0 || email.value.length===0 || telefono.value.length ===0 || isNaN(telefono.value) ||!expr.test(email.value) ){
       checkInputs();
   }else{
        var cliente = {
            nombre: nombre.value,
            apellido: apellido.value,
            direccion: direccion.value,
            email: email.value,
            telefono: telefono.value
        }
        nombre.value = '';
        apellido.value= '';
        direccion.value='';
        email.value='';
        telefono.value  ='';   
        appendObjectToLocalStorage(cliente);
        document.location.href = "#"
        const formulario = nombre.parentElement;
        const formulario2 = apellido.parentElement;
        const formulario3 = direccion.parentElement;
        const formulario4 = email.parentElement;
        const formulario5 = telefono.parentElement;
        formulario.className = 'formulario'; 
        formulario2.className = 'formulario';
        formulario3.className = 'formulario';
        formulario4.className = "formulario"  
        formulario5.className = "formulario"  
    };
});

function checkInputs(){
  
    if(nombre.value.length === 0 ){
        mensajeError(nombre, "Campo obligatorio");
    }else{
        mensajeCorrecto(nombre, "Nombre correcto");
    } if (apellido.value.length === 0){
        mensajeError(apellido,"Campo obligatorio");
    }else{
        mensajeCorrecto(apellido, "Apellido correcto");
    } if(direccion.value.length === 0 ){
        mensajeError(direccion,"Campo obligatorio");
    }else{
        mensajeCorrecto(direccion, "Direccion correcta");
    }
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.value.length===0 ){
        mensajeError(email,"Campo obligatorio");  
    }else if ( !expr.test(email.value) ) {
        mensajeError(email, "El correo ingresado es incorrecto")
    }else{
        mensajeCorrecto(email,"Email correcto");  
    }
     if (telefono.value.length===0){
        mensajeError(telefono,"Campo obligatorio");  
    }else{
        mensajeCorrecto(telefono,"Telefono correcto");  
    }
    if(isNaN(telefono.value)){
        mensajeError(telefono, "S??lo puede ingresar valores n??mericos")
    }
    //if ( !expr.test(email.value) ){
    //mensajeError(email, "El correo ingresado es incorrecto")
    //}
}

function checkInputs2(){
    if(nombre2.value.length === 0 ){
        mensajeError(nombre2, "Campo obligatorio");
    }else{
        mensajeCorrecto(nombre2, "Nombre correcto");
    } if (apellido2.value.length === 0){
        mensajeError(apellido2,"Campo obligatorio");
    }else{
        mensajeCorrecto(apellido2, "Apellido correcto");
    } if(direccion2.value.length === 0 ){
        mensajeError(direccion2,"Campo obligatorio");
    }else{
        mensajeCorrecto(direccion2, "Direccion correcta");
    }    
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( email2.value.length===0 ){
        mensajeError(email2,"Campo obligatorio");  
    }else if ( !expr.test(email2.value) ) {
        mensajeError(email2, "El correo ingresado es incorrecto")
    }else{
        mensajeCorrecto(email2,"Email correcto");  
    } if (telefono2.value.length===0){
        mensajeError(telefono2,"Campo obligatorio");  
    }else{
        mensajeCorrecto(telefono2,"Telefono correcto");  
    }
    if(isNaN(telefono2.value)){
        mensajeError(telefono, "S??lo puede ingresar valores n??mericos")
    }
}

function mensajeError(input,message){
    const formulario = input.parentElement;
    const small = formulario.querySelector('small'); //Se selecciona el elemento small mediante su etiqueta
    formulario.className = 'formulario error'; //se defne una clase (es la que en el css aparece como visibility: visible)
    small.innerText = message; 
}
function mensajeCorrecto(input,message){
    const formulario = input.parentElement;
    const small = formulario.querySelector('small'); //Se selecciona el elemento small mediante su etiqueta
    formulario.className = 'formulario correcto'; //se defne una clase (es la que en el css aparece como visibility: visible)
    small.innerText = message; 
}


function appendObjectToLocalStorage(obj){ /*Esta funcion Recibe el objeto que se acaba de crear y lo almacena en el local storage*/
    var clientes = [];
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); /*Cadena*/ 

    if(dataInLocalStorage != null){
        clientes = JSON.parse(dataInLocalStorage); 
    }
    clientes.push(obj); /*Objeto JSON*/ 
    localStorage.setItem(localStorageKeyName,JSON.stringify(clientes));
    loadFromLocalStorage(); 
} 


function loadFromLocalStorage(){ /*Esta funcion crea las filas, celdas para mostrar la info*/ 
    var gridBody = document.querySelector("#grid tbody"); /*Selecciona la tabla que se quiere editar*/ 
    var clientes = []; /*Arreglo para almacenar los datos del localstorage*/
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); //cadena
  
    if(dataInLocalStorage !== null){ /*Si hay datos, se van almacenando*/
        clientes = JSON.parse(dataInLocalStorage); /*users es un  arreglo de objeto*/ 
    }
    gridBody.innerHTML = ''; 
   
    clientes.forEach(function(x,i) { /*Recorrer un vector-----funci??n anonima. X almacena el objeto*/ 
      var tr = document.createElement("tr"), //Por cada registro se crea esto
          tdCheck = document.createElement("td"),
          inputCheck = document.createElement("input"),
          tdNombre = document.createElement("td"),
          tdApellido = document.createElement("td"),
          tdDireccion = document.createElement("td"),
          tdEmail = document.createElement("td"),
          tdTelefono = document.createElement("td"),
          tdCotizaciones = document.createElement("td"),
          tdOrdenes = document.createElement("td"),
          tdButtons = document.createElement("td"),
          btnEdit = document.createElement("button"),
          btnRemove = document.createElement("button");

    inputCheck.type = 'checkbox';      
    tdCheck.appendChild(inputCheck);

    //Agregar el contenido almacenado en el repositorio sobre el elemento que se acaba de crear
    tdNombre.innerHTML = x.nombre; //Se accede al atributo name del objeto x
    tdApellido.innerHTML = x.apellido; 
    tdDireccion.innerHTML = x.direccion; 
    tdEmail.innerHTML = x.email; 
    tdTelefono.innerHTML = x.telefono; 

     //Bot??n Editar
     btnEdit.textContent = 'Modificar'; //Agregar un contenido que se llame Remove
     btnEdit.className = 'boton_mod boton'; //Agregar una clase
     btnEdit.addEventListener('click', function(){
         editFromLocalStorage(i);
         const formulario = nombre2.parentElement;
         const formulario2 = apellido2.parentElement;
         const formulario3 = direccion2.parentElement;
         const formulario4 = email2.parentElement;
         const formulario5 = telefono2.parentElement;
         formulario.className = 'formulario'; 
         formulario2.className = 'formulario';
         formulario3.className = 'formulario';
         formulario4.className = "formulario"  
         formulario5.className = "formulario"

     });
     tdButtons.appendChild(btnEdit); //Para "concatenarlo" al documento --> Agregarlo a la columna

    //Bot??n Eliminar
    btnRemove.textContent = 'Eliminar'; //Agregar un contenido que se llame Remove
    btnRemove.className = 'boton_eliminar boton'; //Agregar una clase
    btnRemove.addEventListener('click', function(){
      var confirmar = confirm("??Desea eliminar el cliente?");
        if (confirmar == true) {
            removeFromLocalStorage(i);
        } else {
        }
    });
    tdButtons.appendChild(btnRemove); //Para "concatenarlo" al documento --> Agregarlo a la celda

     tdButtons.className = "botones";
     tr.appendChild(tdCheck);
     tr.appendChild(tdNombre);
     tr.appendChild(tdApellido); 
     tr.appendChild(tdDireccion); 
     tr.appendChild(tdEmail); 
     tr.appendChild(tdTelefono); 
     tr.appendChild(tdCotizaciones); 
     tr.appendChild(tdOrdenes); 
     tr.appendChild(tdButtons); 
     gridBody.appendChild(tr);
   });
}

function editFromLocalStorage(index){
    document.location.href = "#ventanamod"
    var clientes = [], //vector de objetos
    dataInLocalStorage = localStorage.getItem(localStorageKeyName);

    clientes = JSON.parse(dataInLocalStorage);
    //console.log(clientes[index]["nombre"]);  //Se obtiene la info de una pos en especifico----ir a la pos index y que muestre el nombre
    document.getElementById('nombre2').value= clientes[index]["nombre"];
    document.getElementById('apellido2').value= clientes[index]["apellido"];
    document.getElementById('direccion2').value= clientes[index]["direccion"];
    document.getElementById('email2').value= clientes[index]["email"];
    document.getElementById('telefono2').value= clientes[index]["telefono"];
    
    document.querySelector('#btn-guardar2').addEventListener("click",function(){
        if(nombre2.value.length === 0 || apellido2.value.length === 0 || direccion2.value.length === 0 || email2.value.length===0 || telefono2.value.length ===0 || isNaN(telefono2.value)){
        checkInputs2();
        }else{
        var nomb = document.getElementById("nombre2"); 
        var apell = document.getElementById("apellido2");
        var dire = document.getElementById("direccion2");
        var em = document.getElementById("email2");
        var telef = document.getElementById("telefono2")
    
        clientes[index]["nombre"] = nomb.value; //Actualizar la informaci??n en la posicion especificada. 
        clientes[index]["apellido"] = apell.value;
        clientes[index]["direccion"] = dire.value;
        clientes[index]["email"] = em.value;
        clientes[index]["telefono"] = telef.value;
        localStorage.setItem(localStorageKeyName, JSON.stringify(clientes)); //Almacena todos nuevamente
        loadFromLocalStorage();  
        document.location.href = "#"
        }
    });
}

function removeFromLocalStorage(index){
    var clientes = []; //vector de objetos
        dataInLocalStorage = localStorage.getItem(localStorageKeyName); //cadena

    clientes = JSON.parse(dataInLocalStorage); //objeto
    clientes.splice(index, 1);

    localStorage.setItem(localStorageKeyName, JSON.stringify(clientes)); //Almacena todos nuevamente, menos el que borr??. (se sobreescriben los datos, si tenia 4 ahora tendr??3)
    loadFromLocalStorage();
}

var buscar = document.getElementById("input_buscar");
buscar.addEventListener("input", function () {

    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function (item) { //Recorre c/u de los tr de la tabla. La primera vez que entra recorre la prima fila que corresponde al nombre
                                                // de cada columna, por eso es que m??s adelante, en la primera iteracion aparece undefined, porque no hay tds en esa fila   
        let val = buscar.value;
        let re = new RegExp(val, 'gi'); //global insensitive*/
        var selected = item.getElementsByTagName("td");

        if (typeof selected[1] != "undefined") { //Entra todas las veces, menos en la primera porque S?? es indefinido ya que en la primera fila NO hay td
            if (selected[1].innerText.match(re)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        }

    });
});
