var localStorageKeyName = 'cotizaciones'; /*El "repositorio" (tabla) se llama data y es aquí donde se van a guardar todos los usuarios.
                                        Si se quieren almacenar, por ejemplo, productos, crear otro repositorio, si se quieren almacenar ventas, crear otro....*/

var localStorageKeyName2 = 'compras';
loadFromLocalStorage2(); /*Se pone al inicio para que se ejecute apenas se cargue la página*/
var productos = [];
ind = 0;

document.querySelector('#btn-crear').addEventListener("click", function () {
    var gridBody = document.querySelector("#grid2 tbody");
    gridBody.innerHTML = ''; //Poner en blanco el tbody de la tabla grid
    const formulario = nombre.parentElement;
    const formulario2 = apellido.parentElement;
    const formulario3 = direccion.parentElement;
    const formulario4 = email.parentElement;
    const formulario5 = telefono.parentElement;
    const formulario6 = fecha.parentElement;
    formulario.className = '';
    formulario2.className = '';
    formulario3.className = '';
    formulario4.className = '';
    formulario5.className = '';
    formulario6.className = '';
    document.location.href = "#ventanacrear";
});

document.querySelector('#btn-agregar').addEventListener("click", function () {
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var direccion = document.getElementById("direccion");
    var email = document.getElementById("email");
    var telefono = document.getElementById("telefono");
    var fecha = document.getElementById("fecha");
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (nombre.value.length === 0 || apellido.value.length === 0 || direccion.value.length === 0 || email.value.length === 0 || telefono.value.length === 0 || fecha.value.length === 0 || isNaN(telefono.value) || !expr.test(email.value)) {
        checkInputs();
    } else {
        document.location.href = "#ventanaproduc";
        var gridBody = document.querySelector("#grid3 tbody");
        loadFromLocalStorage(productos, gridBody, "none");

    }
});

document.querySelector('#btn-agregar2').addEventListener("click", function (event) {
    event.preventDefault(); //Evitar que se recargue la página (Buscar!!)
    bandera = 0;
    var codigo = document.getElementById("codigo");
    var cantidad = document.getElementById("cantidad");
    if (codigo.value.length === 0 || cantidad.value.length === 0) {
        checkInputs2();
    } else {
        var dataInLocalStorage = localStorage.getItem(localStorageKeyName2);
        compras = JSON.parse(dataInLocalStorage); //Objeto
        for (i = 0; i < compras.length; i++) {
            for (z = 0; z < compras[i].productos.length; z++) {
                 
                if (compras[i].productos[z].codigo == codigo.value) {
                    bandera = 1;
                    var producto_coti = { //Se crea el objeto con toda la info para que en el localStorage quede todo la informacion asociada al producto
                        codigo: compras[i].productos[z].codigo,
                        nombreprod: compras[i].productos[z].nombreprod,
                        categoria: compras[i].productos[z].categoria,
                        //ubicacion: compras[i].productos[z].ubicacion,
                        //precioin: compras[i].productos[z].precioin,
                        precio: compras[i].productos[z].preciout,
                        descr: compras[i].productos[z].descr,
                        cantidad: cantidad.value,
                        pres: compras[i].productos[z].pres,
                    }

                    productos.push(producto_coti);
                    var gridBody = document.querySelector("#grid3 tbody");
                    var gridBody2 = document.querySelector("#grid2 tbody");

                    loadFromLocalStorage(productos, gridBody, "none");
                    loadFromLocalStorage(productos, gridBody2, "none");

                    codigo.value = '';
                    cantidad.value = '';

                    const formulario = codigo.parentElement;
                    const formulario2 = cantidad.parentElement;
                    formulario.className = '';
                    formulario2.className = '';
                }
            }
        }
        if (bandera == 0) {

            checkInputs2();
            mensajeError(codigo, "El código ingresado NO se encuentra registrado en el sistema");
        }
    }
  

});

document.querySelector('#btn-guardar2').addEventListener("click", function () { //Guardar productos
    document.location.href = "#ventanacrear";
    var gridBody = document.querySelector("#grid3 tbody");
    checkInputs();
    gridBody.innerHTML = '';
});

document.querySelector('#btn-guardar').addEventListener("click", function () { //Guardar completo
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var direccion = document.getElementById("direccion");
    var email = document.getElementById("email");
    var telefono = document.getElementById("telefono");
    var fecha = document.getElementById("fecha");

    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (nombre.value.length === 0 || apellido.value.length === 0 || direccion.value.length === 0 || email.value.length === 0 || telefono.value.length === 0 || fecha.value.length === 0 || isNaN(telefono.value) || !expr.test(email.value)) {
        checkInputs();
    } else {
        var cotizacion = {
            nombre: nombre.value,
            apellido: apellido.value,
            direccion: direccion.value,
            email: email.value,
            telefono: telefono.value,
            fecha: fecha.value,
            productos: productos,
        }
        if (typeof productos[0] != "undefined"){
        appendObjectToLocalStorage(cotizacion);
        loadFromLocalStorage2();
        var gridBody = document.querySelector("#grid2 tbody");
        gridBody.innerHTML = ''; /*Poner en blanco el tbody de la tabla grid*/
        document.location.href = "#";
        productos.splice(0, productos.length);

        nombre.value = '';
        apellido.value = '';
        direccion.value = '';
        email.value = '';
        telefono.value = '';
        fecha.value = '';
    }else{
        alert("¡ATENCIÓN! Debe agregar al menos un producto a la cotización");
        checkInputs();
        
    }
    }

});

document.querySelector('#btn-cerrar').addEventListener("click", function () {
    var gridBody = document.querySelector("#grid2 tbody");
    gridBody.innerHTML = ''; /*Poner en blanco el tbody de la tabla grid*/
    nombre.value = '';
    apellido.value = '';
    direccion.value = '';
    email.value = '';
    telefono.value = '';
    fecha.value = '';
    productos.splice(0, productos.length);
    document.location.href = "#";
});
document.querySelector('#btn-cerrar2').addEventListener("click", function () {
    var gridBody = document.querySelector("#grid2 tbody");
    gridBody.innerHTML = ''; /*Poner en blanco el tbody de la tabla grid*/
    //nombre2.value = '';
    //fecha2.value = '';
    document.location.href = "#";
});


document.querySelector('#btn-atras').addEventListener("click", function () {
    var gridBody = document.querySelector("#grid3 tbody");
    gridBody.innerHTML = ''; /*Poner en blanco el tbody de la tabla grid*/
    codigo.value = '';
    cantidad.value = '';
    checkInputs();
    //checkInputs2();
    document.location.href = "#ventanacrear";

});
document.querySelector('#btn-atrascambios').addEventListener("click", function () {
    var gridBody = document.querySelector("#gridmod2 tbody");
    gridBody.innerHTML = ''; /*Poner en blanco el tbody de la tabla grid*/
    codigo.value = '';
    cantidad.value = '';
    document.location.href = "#ventanamod";

});

function checkInputs() {
    if (nombre.value.length === 0) {
        mensajeError(nombre, "Campo obligatorio");
    } else {
        mensajeCorrecto(nombre, "Nombre correcto");
    } if (apellido.value.length === 0) {
        mensajeError(apellido, "Campo obligatorio");
    } else {
        mensajeCorrecto(apellido, "Apellido correcto");
    } if (direccion.value.length === 0) {
        mensajeError(direccion, "Campo obligatorio");
    } else {
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
    if (telefono.value.length === 0) {
        mensajeError(telefono, "Campo obligatorio");
    } else {
        mensajeCorrecto(telefono, "Telefono correcto");
    }  
    if(isNaN(telefono.value)){
        mensajeError(telefono, "Sólo puede ingresar valores númericos")
    }
    if (fecha.value.length === 0) {
        mensajeError(fecha, "Campo obligatorio");
    } else {
        mensajeCorrecto(fecha, "Fecha correcta");
    }

    if (nombre2.value.length === 0) {
        mensajeError(nombre2, "Campo obligatorio");
    } else {
        mensajeCorrecto(nombre2, "Nombre correcto");
    } if (apellido2.value.length === 0) {
        mensajeError(apellido2, "Campo obligatorio");
    } else {
        mensajeCorrecto(apellido2, "Apellido correcto");
    } if (direccion2.value.length === 0) {
        mensajeError(direccion2, "Campo obligatorio");
    } else {
        mensajeCorrecto(direccion2, "Direccion correcta");
    } if (email2.value.length === 0) {
        mensajeError(email2, "Campo obligatorio");
    } else {
        mensajeCorrecto(email2, "Email correcta");
    }
    if (telefono2.value.length === 0) {
        mensajeError(telefono2, "Campo obligatorio");
    } else {
        mensajeCorrecto(telefono2, "Telefono correcto");
    } if (fecha2.value.length === 0) {
        mensajeError(fecha2, "Campo obligatorio");
    } else {
        mensajeCorrecto(fecha2, "Fecha correcta");
    }
}

function checkInputs2() {
    if (codigo.value.length === 0) {
        mensajeError2(codigo, "Campo obligatorio");
    } else {
        mensajeCorrecto2(codigo, "Código correcto");
    } if (cantidad.value.length === 0) {
        mensajeError2(cantidad, "Campo obligatorio");
    } else {
        mensajeCorrecto2(cantidad, "Cantidad correcta");
    }
    if (codigo2.value.length === 0) {
        mensajeError2(codigo2, "Campo obligatorio");
    } else {
        mensajeCorrecto2(codigo2, "Código correcto");
    } if (cantidad2.value.length === 0) {
        mensajeError2(cantidad2, "Campo obligatorio");
    } else {
        mensajeCorrecto2(cantidad2, "Cantidad correcta");
    }


    function mensajeError2(input, message) {
        const formulario = input.parentElement;
        const small = formulario.querySelector('small'); //Se selecciona el elemento small mediante su etiqueta
        formulario.className = 'formulario_v2 error'; //se defne una clase (es la que en el css aparece como visibility: visible)
        small.innerText = message;
    }
    function mensajeCorrecto2(input, message) {
        const formulario = input.parentElement;
        const small = formulario.querySelector('small'); //Se selecciona el elemento small mediante su etiqueta
        formulario.className = 'formulario_v2 correcto'; //se defne una clase (es la que en el css aparece como visibility: visible)
        small.innerText = message;
    }
}
function mensajeError(input, message) {
    const formulario = input.parentElement;
    const small = formulario.querySelector('small'); //Se selecciona el elemento small mediante su etiqueta
    formulario.className = 'formulario error'; //se defne una clase (es la que en el css aparece como visibility: visible)
    small.innerText = message;
}
function mensajeCorrecto(input, message) {
    const formulario = input.parentElement;
    const small = formulario.querySelector('small'); //Se selecciona el elemento small mediante su etiqueta
    formulario.className = 'formulario correcto'; //se defne una clase (es la que en el css aparece como visibility: visible)
    small.innerText = message;
}

function appendObjectToLocalStorage(obj) { /*Esta funcion Recibe el objeto que se acaba de crear y lo almacena en el local storage*/
    var cotizaciones = [];
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); /*Cadena*/
    if (dataInLocalStorage != null) {
        cotizaciones = JSON.parse(dataInLocalStorage);
    }
    cotizaciones.push(obj); /*Objeto JSON*/
    localStorage.setItem(localStorageKeyName, JSON.stringify(cotizaciones));
}


function loadFromLocalStorage(productos, gridBody, tipo) { //Cargar info en las 2 tablas pequeñas
    /*Selecciona la tabla que se quiere editar*/
    gridBody.innerHTML = ''; /*Poner en blanco el tbody de la tabla grid*/
    productos.forEach(function (x, i) { /*Recorrer un vector-----función anonima. X almacena el objeto*/
        var tr = document.createElement("tr"), //Por cada registro se crea esto
            tdCheck = document.createElement("td"),
            inputCheck = document.createElement("input"),
            tdCodigo = document.createElement("td"),
            tdNombre = document.createElement("td"),
            tdCategoria = document.createElement("td");
            tdCantidad = document.createElement("td");
            tdPrecio = document.createElement("td");
            tdButton = document.createElement("td"),
            btnEdit = document.createElement("button"),

            inputCheck.type = 'checkbox';
            tdCheck.appendChild(inputCheck);

        //Agregar el contenido almacenado en el repositorio sobre el elemento que se acaba de crear
        tdCodigo.innerHTML = x.codigo; //Se accede al atributo name del objeto x
        tdNombre.innerHTML = x.nombreprod;
        tdCategoria.innerHTML = x.categoria;
        tdCantidad.innerHTML = x.cantidad;
        tdPrecio.innerHTML = x.precio;
        tdButton.appendChild(btnEdit);

        //Botón Editar
        btnEdit.textContent = 'Modificar'; //Agregar un contenido que se llame Remove
        btnEdit.className = 'boton_modtabla boton'; //Agregar una clase
        btnEdit.id = "edit";
        btnEdit.addEventListener('click', function () {
            editFromLocalStorage2(i, ind);
        });

        tdButton.className = "botones";
        tdButton.style.display = tipo;
        tr.appendChild(tdCheck);
        tr.appendChild(tdCodigo); //Para agregar el elemento a la columna
        tr.appendChild(tdNombre);
        tr.appendChild(tdCategoria);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdButton);

        gridBody.appendChild(tr);
    });
}

function loadFromLocalStorage2() { //Cargar info en la tabla grande
    var gridBody = document.querySelector("#grid tbody"); 
    var cotizaciones = []; 
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); //cadena

    if (dataInLocalStorage !== null) { /*Si hay datos, se van almacenando*/
        cotizaciones = JSON.parse(dataInLocalStorage); 
    }
    gridBody.innerHTML = ''; /*Poner en blanco el tbody de la tabla grid*/

    cotizaciones.forEach(function (x, i) { /*Recorrer un vector-----función anonima. X almacena el objeto*/
        var tr = document.createElement("tr"), 
            tdCheck = document.createElement("td"),
            inputCheck = document.createElement("input"),
            tdCliente = document.createElement("td"),
            tdProductos = document.createElement("td"),
            tdFecha = document.createElement("td"),
            tdButtons = document.createElement("td"),
            btnEdit = document.createElement("button"),
            btnRemove = document.createElement("button");

        inputCheck.type = 'checkbox';
        tdCheck.appendChild(inputCheck);

        cadena2 = '';
        for (var z = 0; z < x.productos.length; z++) {
            pro = x.productos[z].nombreprod;
            cadena = x.productos[z].nombreprod;
            cadena2 = cadena + ', ' + cadena2;
            tdProductos.innerHTML = cadena2;
        }

        tdCliente.innerHTML = x.nombre + ' ' + x.apellido; 
        tdFecha.innerHTML = x.fecha;

        //Botón Editar
        btnEdit.textContent = 'Modificar'; 
        btnEdit.className = 'boton_mod boton'; 
        btnEdit.addEventListener('click', function () {
            ind = i;
            editFromLocalStorage(i);
             const formulario = nombre2.parentElement;
             const formulario2 = apellido2.parentElement;
             const formulario3 = direccion2.parentElement;
             const formulario4 = email2.parentElement;
             const formulario5 = telefono2.parentElement;
             const formulario6 = fecha2.parentElement;
             formulario.className = '';
             formulario2.className = '';
             formulario3.className = '';
             formulario4.className = '';
             formulario5.className = '';
             formulario6.className = '';
        });

        tdButtons.appendChild(btnEdit); //Para "concatenarlo" al documento --> Agregarlo a la columna

        //Botón Eliminar
        btnRemove.textContent = 'Eliminar'; //Agregar un contenido que se llame Remove
        btnRemove.className = 'boton_eliminar boton'; //Agregar una clase
        btnRemove.addEventListener('click', function () {
            var confirmar = confirm("¿Desea eliminar la cotización?");
            if (confirmar == true) {
                removeFromLocalStorage(i);
            } else {
            }
        });

        tdButtons.appendChild(btnRemove); //Para "concatenarlo" al documento --> Agregarlo a la celda
        tdButtons.className = "botones";
        tr.appendChild(tdCheck);
        tr.appendChild(tdCliente); //Para agregar el elemento a la columna
        tr.appendChild(tdProductos)
        tr.appendChild(tdFecha);
        tr.appendChild(tdButtons);
        gridBody.appendChild(tr);

    });
}

function editFromLocalStorage(index) {
    document.location.href = "#ventanamod";
    var cotizaciones = [], //vector de objetos
    dataInLocalStorage = localStorage.getItem(localStorageKeyName);
    cotizaciones = JSON.parse(dataInLocalStorage);

    document.getElementById('nombre2').value = cotizaciones[index]["nombre"];
    document.getElementById('apellido2').value = cotizaciones[index]["apellido"];
    document.getElementById('direccion2').value = cotizaciones[index]["direccion"];
    document.getElementById('email2').value = cotizaciones[index]["email"];
    document.getElementById('telefono2').value = cotizaciones[index]["telefono"];
    document.getElementById('fecha2').value = cotizaciones[index]["fecha"];
    var gridBody = document.querySelector("#gridmod tbody");
    loadFromLocalStorage(cotizaciones[index]["productos"], gridBody, "");

    document.querySelector('#btn-guardarcambios').addEventListener("click", function () {
        expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (nombre2.value.length === 0 || apellido2.value.length === 0 || direccion2.value.length === 0 || email2.value.length === 0 || telefono2.value.length === 0 || fecha2.value.length === 0 ||isNaN(telefono2.value) || !expr.test(email2.value) ) {
            checkInputs();
        } else {
            //dataInLocalStorage = localStorage.getItem(localStorageKeyName);
            //cotizaciones = JSON.parse(dataInLocalStorage);

            var nom = document.getElementById("nombre2");
            var apell = document.getElementById("apellido2");
            var dir = document.getElementById("direccion2");
            var em = document.getElementById("email2");
            var tel = document.getElementById("telefono2");
            var fec = document.getElementById("fecha2");

            cotizaciones[index]["nombre"] = nom.value;
            cotizaciones[index]["apellido"] = apell.value;
            cotizaciones[index]["direccion"] = dir.value;
            cotizaciones[index]["email"] = em.value;
            cotizaciones[index]["telefono"] = tel.value;
            cotizaciones[index]["fecha"] = fec.value;
     
            localStorage.setItem(localStorageKeyName, JSON.stringify(cotizaciones));            
            loadFromLocalStorage2();

            document.location.href = "#"
            /*const formulario = nombre2.parentElement;
            const formulario2 = apellido2.parentElement;
            const formulario3 = direccion2.parentElement;
            const formulario4 = email2.parentElement;
            const formulario5 = telefono2.parentElement;
            const formulario6 = fecha2.parentElement;
            formulario.className = 'formulario';
            formulario2.className = 'formulario'; formulario3.className = 'formulario';
            formulario4.className = 'formulario';
            formulario5.className = 'formulario';
            formulario6.className = 'formulario';*/
        }
    });

}

function editFromLocalStorage2(index, ind) { //index corresponde al indice del producto seleccionado, ind corresponde al indice de la cotizacion (en general) seleccionada
    btnEditar = document.querySelector("#btn-editarmod");
    btnEditar.style.display = "none";
    document.location.href = "#ventanaproducmod";

    var cotizaciones = [], //vector de objetos
    dataInLocalStorage = localStorage.getItem(localStorageKeyName);
    cotizaciones = JSON.parse(dataInLocalStorage);
    var dataInLocalStorage2 = localStorage.getItem(localStorageKeyName2);
    compras = JSON.parse(dataInLocalStorage2); //Objeto

    var gridBody = document.querySelector("#gridmod2 tbody");
    loadFromLocalStorage(cotizaciones[ind]["productos"], gridBody, "none");
    document.getElementById('codigo2').value = cotizaciones[ind]["productos"][index].codigo;
    document.getElementById('cantidad2').value = cotizaciones[ind]["productos"][index].cantidad;

    document.querySelector('#btn-guardarcambios2').addEventListener("click", function (event) {
        event.preventDefault();
        bandera = 0;
        var codigo =  document.getElementById('codigo2');
        var cantidad = document.getElementById('cantidad2');
        if (codigo.value.length === 0 || cantidad.value.length === 0) {
            checkInputs2();
        }else{
            for (i = 0; i < compras.length; i++) {
                for (z = 0; z < compras[i].productos.length; z++) {                 
                
                    if (compras[i].productos[z].codigo == codigo.value) {
                        bandera = 1;
                        var codigo = document.getElementById('codigo2');
                        var cantidad = document.getElementById('cantidad2');
    
                        cotizaciones[ind]["productos"][index].codigo = codigo.value;
                        cotizaciones[ind]["productos"][index].nombreprod = compras[i].productos[z].nombreprod;
                        cotizaciones[ind]["productos"][index].categoria = compras[i].productos[z].categoria;
                        cotizaciones[ind]["productos"][index].precio = compras[i].productos[z].preciout;
                        cotizaciones[ind]["productos"][index].descr = compras[i].productos[z].descr;
                        cotizaciones[ind]["productos"][index].cantidad = cantidad.value;
                        cotizaciones[ind]["productos"][index].pres = compras[i].productos[z].pres;
                        console.log(cotizaciones[ind]);
                        localStorage.setItem(localStorageKeyName, JSON.stringify(cotizaciones));

                        dataInLocalStorage = localStorage.getItem(localStorageKeyName);
                        
                        var gridBody = document.querySelector("#gridmod2 tbody");
                        var gridBody2 = document.querySelector("#gridmod tbody");

                        loadFromLocalStorage(cotizaciones[ind]["productos"], gridBody, "none");
                        loadFromLocalStorage(cotizaciones[ind]["productos"], gridBody2, "");
                        //loadFromLocalStorage2();
                
                        document.location.href = "#ventanamod";
                    }
                }
            }
            if (bandera == 0) {
                checkInputs2();
                mensajeError(codigo, "El código ingresado NO se encuentra registrado en el sistema");
            }
    
        }
    });
    document.querySelector('#btn-guardarcambios').addEventListener("click", function () {
        //console.log("prueba: ");
        //console.log(JSON.stringify(cotizaciones));
        localStorage.setItem(localStorageKeyName, JSON.stringify(cotizaciones));
        loadFromLocalStorage2();
    });
}

function removeFromLocalStorage(index) {
    var cotizaciones = []; //vector de objetos
    dataInLocalStorage = localStorage.getItem(localStorageKeyName); //cadena
    cotizaciones = JSON.parse(dataInLocalStorage); //objeto
    cotizaciones.splice(index, 1);
    localStorage.setItem(localStorageKeyName, JSON.stringify(cotizaciones)); //Almacena todos nuevamente, menos el que borré. (se sobreescriben los datos, si tenia 4 ahora tendré3)
    loadFromLocalStorage2();
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