var localStorageKeyName = 'ordenes'; 

var localStorageKeyName2 = 'compras';
loadFromLocalStorage2(); 
var productos = [];
ind = 0;

document.querySelector('#btn-crear').addEventListener("click", function () {
    var gridBody = document.querySelector("#grid2 tbody");
    gridBody.innerHTML = ''; 
    const formulario = nombre.parentElement;
    const formulario2 = apellido.parentElement;
    const formulario3 = direccion.parentElement;
    const formulario4 = email.parentElement;
    const formulario5 = telefono.parentElement;
    const formulario6 = metodo.parentElement;
    const formulario7 = idresp.parentElement;
    const formulario8 = fecha.parentElement;
    formulario.className = '';
    formulario2.className = '';
    formulario3.className = '';
    formulario4.className = '';
    formulario5.className = '';
    formulario6.className = '';
    formulario7.className = '';
    formulario8.className = '';
    document.location.href = "#ventanacrear";

});
document.querySelector('#btn-agregar').addEventListener("click", function (event) {
    event.preventDefault();
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var direccion = document.getElementById("direccion");
    var email = document.getElementById("email");
    var telefono = document.getElementById("telefono");
    var metodo = document.getElementById("metodo");
    var idresp = document.getElementById("idresp");
    var estado = document.getElementById("estado");
    var fecha = document.getElementById("fecha");
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (nombre.value.length === 0 || apellido.value.length === 0 || direccion.value.length === 0 || email.value.length === 0 || telefono.value.length === 0 || fecha.value.length === 0 || metodo.value.length === 0 || idresp.value.length === 0 || estado.value.length === 0 || isNaN(telefono.value) || !expr.test(email.value)) {
        checkInputs();
    } else {
        document.location.href = "#ventanaproduc";
    }
});

document.querySelector('#btn-agregar2').addEventListener("click", function (event) {
    event.preventDefault(); //Evitar que se recargue la página
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
                console.log(compras[i].productos[z].codigo);
                console.log(codigo.value);
                if (compras[i].productos[z].codigo == codigo.value) {
                    console.log("SI coincide");
                    bandera = 1;
                    var producto_orden = { //Se crea el objeto con toda la info para que en el localStorage quede todo la informacion asociada al producto
                        codigo: compras[i].productos[z].codigo,
                        nombreprod: compras[i].productos[z].nombreprod,
                        categoria: compras[i].productos[z].categoria,
                        precio: compras[i].productos[z].preciout,
                        descr: compras[i].productos[z].descr,
                        cantidad: cantidad.value,
                        pres: compras[i].productos[z].pres,
                    }

                    productos.push(producto_orden);
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
    var metodo = document.getElementById("metodo");
    var idresp = document.getElementById("idresp");
    var estado = document.getElementById("estado");
    var fecha = document.getElementById("fecha");
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (nombre.value.length === 0 || apellido.value.length === 0 || direccion.value.length === 0 || email.value.length === 0 || telefono.value.length === 0 || fecha.value.length === 0 || metodo.value.length === 0 || idresp.value.length === 0 || estado.value.length === 0 || isNaN(telefono.value) || !expr.test(email.value)) {
        checkInputs();
    } else {
        var orden = {
            nombre: nombre.value,
            apellido: apellido.value,
            direccion: direccion.value,
            email: email.value,
            telefono: telefono.value,
            metodopago: metodo.value,
            idresp: idresp.value,
            estado: estado.value,
            fecha: fecha.value,
            productos: productos,
        }
        if (typeof productos[0] != "undefined") {
            appendObjectToLocalStorage(orden);
            loadFromLocalStorage2();
            var gridBody = document.querySelector("#grid2 tbody");
            gridBody.innerHTML = ''; 
            document.location.href = "#";
            productos.splice(0, productos.length);

            nombre.value = '';
            apellido.value = '';
            direccion.value = '';
            email.value = '';
            telefono.value = '';
            idresp.value = '';
            fecha.value = '';
        } else {
            alert("¡ATENCIÓN! Debe agregar al menos un producto a la orden de trabajo");
            checkInputs();
        }
    }
});

document.querySelector('#btn-cerrar').addEventListener("click", function () {
    var gridBody = document.querySelector("#grid2 tbody");
    gridBody.innerHTML = '';
    nombre.value = '';
    apellido.value = '';
    direccion.value = '';
    email.value = '';
    telefono.value = '';
    fecha.value = '';
    idresp.value='';
    productos.splice(0, productos.length);
    document.location.href = "#";
});

document.querySelector('#btn-cerrar2').addEventListener("click", function () {
    var gridBody = document.querySelector("#grid2 tbody");
    gridBody.innerHTML = ''; 
    //nombre2.value = '';
    //fecha2.value = '';
    document.location.href = "#";
});

document.querySelector('#btn-atras').addEventListener("click", function () {
    var gridBody = document.querySelector("#grid3 tbody");
    gridBody.innerHTML = '';
    // codigo.value = '';
    //cantidad.value = '';
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
    if (email.value.length === 0) {
        mensajeError(email, "Campo obligatorio");
    } else if (!expr.test(email.value)) {
        mensajeError(email, "El correo ingresado es incorrecto")
    } else {
        mensajeCorrecto(email, "Email correcto");
    }
    if (telefono.value.length === 0) {
        mensajeError(telefono, "Campo obligatorio");
    } else {
        mensajeCorrecto(telefono, "Telefono correcto");
    }
    if (isNaN(telefono.value)) {
        mensajeError(telefono, "Sólo puede ingresar valores númericos")
    }
    if (metodo.value.length === 0) {
        mensajeError(metodo, "Campo obligatorio");
    } else {
        mensajeCorrecto(metodo, "");
    }
    if (idresp.value.length === 0) {
        mensajeError(idresp, "Campo obligatorio");
    } else {
        mensajeCorrecto(idresp, "ID correcto");
    }
    if (estado.value.length === 0) {
        mensajeError(estado, "Campo obligatorio");
    } else {
        mensajeCorrecto(estado, "");
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
    } if (telefono2.value.length === 0) {
        mensajeError(telefono2, "Campo obligatorio");
    } else {
        mensajeCorrecto(telefono2, "Telefono correcto");
    }
    if (idresp2.value.length === 0) {
        mensajeError(idresp2, "Campo obligatorio");
    } else {
        mensajeCorrecto(idresp2, "ID correcto");
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
    var ordenes = [];
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); /*Cadena*/
    if (dataInLocalStorage != null) {
        ordenes = JSON.parse(dataInLocalStorage);
    }
    ordenes.push(obj); /*Objeto JSON*/
    localStorage.setItem(localStorageKeyName, JSON.stringify(ordenes));
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
            editFromLocalStorage2(i, ind); //i es el producto seleccionado
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
function loadFromLocalStorage2() {  //Cargar infor en la tabla grande
    var gridBody = document.querySelector("#grid tbody");
    var ordenes = [];
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); //cadena

    if (dataInLocalStorage !== null) { /*Si hay datos, se van almacenando*/
        ordenes = JSON.parse(dataInLocalStorage);
    }
    gridBody.innerHTML = '';

    ordenes.forEach(function (x, i) { /*Recorrer un vector-----función anonima. X almacena el objeto*/
        var tr = document.createElement("tr"),
            tdCheck = document.createElement("td"),
            inputCheck = document.createElement("input"),
            tdCliente = document.createElement("td"),
            tdResponsable = document.createElement("td"),
            tdEstado = document.createElement("td"),
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
            //tdProductos.innerHTML = cadena2;
        }

        tdCliente.innerHTML = x.nombre + ' ' + x.apellido;
        tdResponsable.innerHTML = x.idresp;
        tdEstado.innerHTML = x.estado;
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
            const formulario6 = metodo2.parentElement;
            const formulario7 = fecha2.parentElement;
            const formulario8 = idresp2.parentElement;
            const formulario9 = estado2.parentElement;

            formulario.className = '';
            formulario2.className = '';
            formulario3.className = '';
            formulario4.className = '';
            formulario5.className = '';
            formulario6.className = '';
            formulario7.className = '';
            formulario8.className = '';
            formulario9.className = '';

        });

        tdButtons.appendChild(btnEdit); //Para "concatenarlo" al documento --> Agregarlo a la columna

        //Botón Eliminar
        btnRemove.textContent = 'Eliminar'; //Agregar un contenido que se llame Remove
        btnRemove.className = 'boton_eliminar boton'; //Agregar una clase
        btnRemove.addEventListener('click', function () {
            var confirmar = confirm("¿Desea eliminar la orden de trabajo?");
            if (confirmar == true) {
                removeFromLocalStorage(i);
            } else {
            }
        });

        tdButtons.appendChild(btnRemove); //Para "concatenarlo" al documento --> Agregarlo a la celda
        tdButtons.className = "botones";
        tr.appendChild(tdCheck);
        tr.appendChild(tdCliente); //Para agregar el elemento a la columna
        tr.appendChild(tdResponsable);
        tr.appendChild(tdEstado);
        tr.appendChild(tdFecha);
        tr.appendChild(tdButtons);
        gridBody.appendChild(tr);

    });
}

function editFromLocalStorage(index) { //Primer edit
    document.location.href = "#ventanamod";
    var ordenes = [], //vector de objetos
    dataInLocalStorage = localStorage.getItem(localStorageKeyName);
    ordenes = JSON.parse(dataInLocalStorage);

    document.getElementById('nombre2').value = ordenes[index]["nombre"];
    document.getElementById('apellido2').value = ordenes[index]["apellido"];
    document.getElementById('direccion2').value = ordenes[index]["direccion"];
    document.getElementById('email2').value = ordenes[index]["email"];
    document.getElementById('telefono2').value = ordenes[index]["telefono"];
    document.getElementById('metodo2').value = ordenes[index]["metodopago"];
    document.getElementById('idresp2').value = ordenes[index]["idresp"];
    document.getElementById('fecha2').value = ordenes[index]["fecha"];
    document.getElementById('estado2').value = ordenes[index]["estado"];

    var gridBody = document.querySelector("#gridmod tbody");
    loadFromLocalStorage(ordenes[index]["productos"], gridBody);

    document.querySelector('#btn-guardarcambios').addEventListener("click", function () {   
        //expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (nombre2.value.length === 0 || apellido2.value.length === 0 || direccion2.value.length === 0 || email2.value.length === 0 || telefono2.value.length === 0 || fecha2.value.length === 0 || metodo2.value.length === 0 || idresp2.value.length === 0 || estado2.value.length === 0 || isNaN(telefono2.value)) {
            checkInputs();
        } else {
            //dataInLocalStorage = localStorage.getItem(localStorageKeyName);
            //ordenes = JSON.parse(dataInLocalStorage);

            var nomb = document.getElementById("nombre2");
            var apell = document.getElementById("apellido2");
            var dir = document.getElementById("direccion2");
            var em = document.getElementById("email2");
            var tel = document.getElementById("telefono2");
            var met = document.getElementById("metodo2");
            var id = document.getElementById("idresp2");
            var fec = document.getElementById("fecha2");
            var est = document.getElementById("estado2");

            console.log("Indice de la orden editada");
            console.log(index);
            ordenes[index]["nombre"] = nomb.value;
            ordenes[index]["apellido"] = apell.value;
            ordenes[index]["direccion"] = dir.value;
            ordenes[index]["email"] = em.value;
            ordenes[index]["telefono"] = tel.value;
            ordenes[index]["metodopago"] = met.value;
            ordenes[index]["idresp"] = id.value;
            ordenes[index]["fecha"] = fec.value;
            ordenes[index]["estado"] = est.value;

            //dataInLocalStorage = localStorage.getItem(localStorageKeyName);
            //ordenes = JSON.parse(dataInLocalStorage);

            localStorage.setItem(localStorageKeyName, JSON.stringify(ordenes));
            loadFromLocalStorage2();

            document.location.href = "#"
            const formulario = nombre2.parentElement;
            const formulario2 = apellido2.parentElement;
            const formulario3 = direccion2.parentElement;
            const formulario4 = email2.parentElement;
            const formulario5 = telefono2.parentElement;
            const formulario6 = metodo2.parentElement;
            const formulario7 = fecha2.parentElement;
            const formulario8 = idresp2.parentElement;
            const formulario9 = estado2.parentElement;

            formulario.className = '';
            formulario2.className = '';
            formulario3.className = '';
            formulario4.className = '';
            formulario5.className = '';
            formulario6.className = '';
            formulario7.className = '';
            formulario8.className = '';
            formulario9.className = '';
        }
    });

}

function editFromLocalStorage2(index, ind) { //Edit de los productos. index corresponde al indice del producto seleccionado, ind corresponde al indice de la orden (en general) seleccionada
    btnEditar = document.querySelector("#btn-editarmod");
    btnEditar.style.display = "none";
    document.location.href = "#ventanaproducmod";

    console.log("Indice del producto e indice de la orden");
    console.log(index);
    console.log(ind);

    var ordenes = [], //vector de objetos
    dataInLocalStorage = localStorage.getItem(localStorageKeyName);
    ordenes = JSON.parse(dataInLocalStorage);
    var dataInLocalStorage2 = localStorage.getItem(localStorageKeyName2);
    compras = JSON.parse(dataInLocalStorage2); //Objeto

    var gridBody = document.querySelector("#gridmod2 tbody");
    loadFromLocalStorage(ordenes[ind]["productos"], gridBody, "none");
    document.getElementById('codigo2').value = ordenes[ind]["productos"][index].codigo;
    document.getElementById('cantidad2').value = ordenes[ind]["productos"][index].cantidad;

    document.querySelector('#btn-guardarcambios2').addEventListener("click", function (event) {
        event.preventDefault();

        bandera = 0;
        var codigo = document.getElementById('codigo2');
        var cantidad = document.getElementById('cantidad2');
        if (codigo.value.length === 0 || cantidad.value.length === 0) {
            checkInputs2();
        } else {
            for (i = 0; i < compras.length; i++) {
                for (z = 0; z < compras[i].productos.length; z++) {

                    if (compras[i].productos[z].codigo == codigo.value) {
                        console.log("SI coincide");
                        bandera = 1;
                        var codigo = document.getElementById('codigo2');
                        var cantidad = document.getElementById('cantidad2');

                        ordenes[ind]["productos"][index].codigo = codigo.value;
                        ordenes[ind]["productos"][index].nombreprod = compras[i].productos[z].nombreprod;
                        ordenes[ind]["productos"][index].categoria = compras[i].productos[z].categoria;
                        ordenes[ind]["productos"][index].precio = compras[i].productos[z].preciout;
                        ordenes[ind]["productos"][index].descr = compras[i].productos[z].descr;
                        ordenes[ind]["productos"][index].cantidad = cantidad.value;
                        ordenes[ind]["productos"][index].pres = compras[i].productos[z].pres;
                        console.log(ordenes[ind]);
                        localStorage.setItem(localStorageKeyName, JSON.stringify(ordenes));

                        dataInLocalStorage = localStorage.getItem(localStorageKeyName);
                        //console.log("ESTO ES DATA IN dentro del if del evento guardar cambios");
                        //console.log(dataInLocalStorage);

                        var gridBody = document.querySelector("#gridmod2 tbody");
                        var gridBody2 = document.querySelector("#gridmod tbody");

                        loadFromLocalStorage(ordenes[ind]["productos"], gridBody, "none");
                        loadFromLocalStorage(ordenes[ind]["productos"], gridBody2, "");
                        //loadFromLocalStorage2();

                        document.location.href = "#ventanamod";
                    }
                }
            }
            if (bandera == 0) {
                console.log("NINGUNA COINCIDENCIA");
                checkInputs2();
                mensajeError(codigo, "El código ingresado NO se encuentra registrado en el sistema");
            }

        }
    });

    document.querySelector('#btn-guardarcambios').addEventListener("click", function () {
        console.log("prueba: ");
        console.log(JSON.stringify(ordenes));
        localStorage.setItem(localStorageKeyName, JSON.stringify(ordenes));
    });

}

function removeFromLocalStorage(index) {
    console.log(index);
    var ordenes = []; //vector de objetos
    dataInLocalStorage = localStorage.getItem(localStorageKeyName); //cadena
    ordenes = JSON.parse(dataInLocalStorage); //objeto
    ordenes.splice(index, 1);
    localStorage.setItem(localStorageKeyName, JSON.stringify(ordenes)); //Almacena todos nuevamente, menos el que borré. (se sobreescriben los datos, si tenia 4 ahora tendré3)
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

        if (typeof selected[1] != "undefined") { //Entra todas las veces, menos en la primera porque SÍ es indefinido ya que en la primera fila NO hay td
            if (selected[1].innerText.match(re)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        }
    });
});
