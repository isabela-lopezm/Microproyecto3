var localStorageKeyName = 'compras';
loadFromLocalStorage2();
var productos = [];
var ind = 0;

document.querySelector('#btn-crear').addEventListener("click", function () {
    var gridBody = document.querySelector("#grid2 tbody");
    gridBody.innerHTML = ''; 
    const formulario = proveedor.parentElement;
    const formulario2 = fecha.parentElement;
    formulario.className = 'formulario';
    formulario2.className = 'formulario';
    document.location.href = "#ventanacrear";
});

document.querySelector('#btn-agregar').addEventListener("click", function (event) {
    event.preventDefault(); //Evitar que se recargue la página (Buscar!!)
    var proveedor = document.getElementById("proveedor");
    var fecha = document.getElementById("fecha");
    if (proveedor.value.length === 0 || fecha.value.length === 0) {
        checkInputs();
    } else {
        document.location.href = "#ventanaproduc";
        //agregarProducto();
    }
});

document.querySelector('#btn-guardar').addEventListener("click", function () {
    var proveedor = document.getElementById("proveedor");
    var fecha = document.getElementById("fecha");
    if (proveedor.value.length === 0 || fecha.value.length === 0) {
        checkInputs();
    } else {
        var compra = {
            proveedor: proveedor.value,
            fecha: fecha.value,
            productos: productos,
        }

        if (typeof productos[0] != "undefined"){
        appendObjectToLocalStorage(compra);
        loadFromLocalStorage2();
        var gridBody = document.querySelector("#grid2 tbody");
        gridBody.innerHTML = ''; 
        document.location.href = "#";

        productos.splice(0, productos.length);
        const formulario = proveedor.parentElement;
        const formulario2 = fecha.parentElement;
        formulario.className = 'formulario';
        formulario2.className = 'formulario';
        proveedor.value = '';
        fecha.value = '';
       
        }else{
            alert("¡ATENCIÓN! Debe agregar al menos un producto a la compra");
            checkInputs();
        }
    }
});
//function agregarProducto() {
document.querySelector('#btn-agregar2').addEventListener("click", function () {
    var codigo = document.getElementById("codigo");
    var categoria = document.getElementById("categoria");
    var precioin = document.getElementById("precioin");
    var descr = document.getElementById("descr");
    var pres = document.getElementById("pres");
    var nombreprod = document.getElementById("nombreprod");
    var ubicacion = document.getElementById("ubicacion");
    var preciout = document.getElementById("preciout");
    var unidad = document.getElementById("unidad");

    if (codigo.value.length === 0 || categoria.value.length === 0 || precioin.value.length === 0 || descr.value.length === 0 || pres.value.length === 0 || nombreprod.value.length === 0 || ubicacion.value.length === 0 || preciout.value.length === 0 || unidad.value.length === 0) {
        checkInputs2();
    } else {
        var producto_compra = {
            codigo: codigo.value,
            nombreprod: nombreprod.value,
            categoria: categoria.value,
            ubicacion: ubicacion.value,
            precioin: precioin.value,
            preciout: preciout.value,
            descr: descr.value,
            unidad: unidad.value,
            pres: pres.value,
        }

        productos.push(producto_compra);
        var gridBody = document.querySelector("#grid2 tbody");
        loadFromLocalStorage(productos, gridBody, "none");

        codigo.value = '';
        nombreprod.value = '';
        categoria.value = '';
        precioin.value = '';
        preciout.value = '';
        descr.value = '';
        unidad.value = '';
        pres.value = '';

        document.location.href = "#ventanacrear";
        const formulario = codigo.parentElement;
        const formulario2 = nombreprod.parentElement;
        const formulario3 = categoria.parentElement;
        const formulario4 = precioin.parentElement;
        const formulario5 = preciout.parentElement;
        const formulario6 = descr.parentElement;
        const formulario7 = unidad.parentElement;
        const formulario8 = pres.parentElement;
        formulario.className = 'formulario';
        formulario2.className = 'formulario';
        formulario3.className = 'formulario';
        formulario4.className = "formulario"
        formulario5.className = "formulario"
        formulario6.className = "formulario"
        formulario7.className = "formulario"
        formulario8.className = "formulario"
        checkInputs();
    }
});

//}
document.querySelector('#btn-cerrar').addEventListener("click", function () {
    var gridBody = document.querySelector("#grid2 tbody");
    gridBody.innerHTML = ''; 
    proveedor.value = '';
    fecha.value = '';
    productos.splice(0, productos.length);
    document.location.href = "#";
});

document.querySelector('#btn-cerrar2').addEventListener("click", function () {
    var gridBody = document.querySelector("#grid3 tbody");
    gridBody.innerHTML = ''; 
   // proveedor2.value = '';
    //fecha2.value = '';
    document.location.href = "#";
});

document.querySelector('#btn-atras').addEventListener("click", function () {
    checkInputs();
    document.location.href = "#ventanacrear";
    const formulario = codigo.parentElement;
    const formulario2 = nombreprod.parentElement;
    const formulario3 = categoria.parentElement;
    const formulario4 = precioin.parentElement;
    const formulario5 = preciout.parentElement;
    const formulario6 = descr.parentElement;
    const formulario7 = unidad.parentElement;
    const formulario8 = pres.parentElement;
    formulario.className = 'formulario';
    formulario2.className = 'formulario';
    formulario3.className = 'formulario';
    formulario4.className = "formulario"
    formulario5.className = "formulario"
    formulario6.className = "formulario"
    formulario7.className = "formulario"
    formulario8.className = "formulario"
});

document.querySelector('#btn-atras2').addEventListener("click", function () {
    checkInputs();
    document.location.href = "#ventanamod";
});


function checkInputs() {
    if (proveedor.value.length === 0) {
        mensajeError(proveedor, "Campo obligatorio");
    } else {
        mensajeCorrecto(proveedor, "Nombre correcto");
    }
    if (fecha.value.length === 0) {
        mensajeError(fecha, "Campo obligatorio");
    } else {
        mensajeCorrecto(fecha, "Fecha correcta");
    }
    if (proveedor2.value.length === 0) {
        mensajeError(proveedor2, "Campo obligatorio");
    } else {
        mensajeCorrecto(proveedor2, "Nombre correcto");
    }
    if (fecha2.value.length === 0) {
        mensajeError(fecha2, "Campo obligatorio");
    } else {
        mensajeCorrecto(fecha2, "Fecha correcta");
    }
}

function checkInputs2() {
    if (codigo.value.length === 0) {
        mensajeError2(codigo, "Campo obligatorio");
    } else {
        mensajeCorrecto2(codigo, "Codigo correcto");
    }
    if (categoria.value.length === 0) {
        mensajeError2(categoria, "Campo obligatorio");
    } else {
        mensajeCorrecto2(categoria, "Categoria correcta");
    }
    if (precioin.value.length === 0) {
        mensajeError2(precioin, "Campo obligatorio");
    } else {
        mensajeCorrecto2(precioin, "Precio correcto");
    }
    if (descr.value.length === 0) {
        mensajeError2(descr, "Campo obligatorio");
    } else {
        mensajeCorrecto2(descr, "Descripción correcta");
    }
    if (pres.value.length === 0) {
        mensajeError2(pres, "Campo obligatorio");
    } else {
        mensajeCorrecto2(pres, "Presentación correcta");
    } if (nombreprod.value.length === 0) {
        mensajeError2(nombreprod, "Campo obligatorio");
    } else {
        mensajeCorrecto2(nombreprod, "Nombre correcto");
    }
    if (ubicacion.value.length === 0) {
        mensajeError2(ubicacion, "Campo obligatorio");
    } else {
        mensajeCorrecto2(ubicacion, "Ubicación correcta");
    }
    if (preciout.value.length === 0) {
        mensajeError2(preciout, "Campo obligatorio");
    } else {
        mensajeCorrecto2(preciout, "Precio correcto");
    }
    if (unidad.value.length === 0) {
        mensajeError2(unidad, "Campo obligatorio");
    } else {
        mensajeCorrecto2(unidad, "Unidad correcta");
    }
    

    if (codigo2.value.length === 0) {
        mensajeError2(codigo2, "Campo obligatorio");
    } else {
        mensajeCorrecto2(codigo2, "Codigo correcto");
    }
    if (categoria2.value.length === 0) {
        mensajeError2(categoria2, "Campo obligatorio");
    } else {
        mensajeCorrecto2(categoria2, "Categoria correcta");
    }
    if (precioin2.value.length === 0) {
        mensajeError2(precioin2, "Campo obligatorio");
    } else {
        mensajeCorrecto2(precioin2, "Precio correcto");
    }
    if (descr2.value.length === 0) {
        mensajeError2(descr2, "Campo obligatorio");
    } else {
        mensajeCorrecto2(descr2, "Descripción correcta");
    }
    if (pres2.value.length === 0) {
        mensajeError2(pres2, "Campo obligatorio");
    } else {
        mensajeCorrecto2(pres2, "Presentación correcta");
    } if (nombreprod2.value.length === 0) {
        mensajeError2(nombreprod2, "Campo obligatorio");
    } else {
        mensajeCorrecto2(nombreprod2, "Nombre correcto");
    }
    if (ubicacion2.value.length === 0) {
        mensajeError2(ubicacion2, "Campo obligatorio");
    } else {
        mensajeCorrecto2(ubicacion2, "Ubicación correcta");
    }
    if (preciout2.value.length === 0) {
        mensajeError2(preciout2, "Campo obligatorio");
    } else {
        mensajeCorrecto2(preciout2, "Precio correcto");
    }
    if (unidad2.value.length === 0) {
        mensajeError2(unidad2, "Campo obligatorio");
    } else {
        mensajeCorrecto2(unidad2, "Unidad correcta");
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

function appendObjectToLocalStorage(obj) { /*Esta funcion Recibe el objeto que se acaba de crear y lo almacena en el local storage*/
    var compras = [];
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); /*Cadena*/
    if (dataInLocalStorage != null) {
        compras = JSON.parse(dataInLocalStorage);
    }
    compras.push(obj); /*Objeto JSON*/
    localStorage.setItem(localStorageKeyName, JSON.stringify(compras));
}

function loadFromLocalStorage(productos, gridBody, tipo) { //Cargar info en la tabla pequeña
    //var gridBody = document.querySelector("#grid2 tbody"); //Selecciona la tabla que se quiere editar
    gridBody.innerHTML = '';
    if (typeof productos != "undefined") {
        productos.forEach(function (x, i) { // x representa el objeto con la info, e i representa el indice 
            var tr = document.createElement("tr"),
                tdCheck = document.createElement("td"),
                inputCheck = document.createElement("input"),
                tdCodigo = document.createElement("td"),
                tdNombre = document.createElement("td"),
                tdCategoria = document.createElement("td");
                tdPrecio = document.createElement("td");
                tdButton = document.createElement("td"),
                btnEdit = document.createElement("button"),
                inputCheck.type = 'checkbox';
                tdCheck.appendChild(inputCheck);

            //Agregar el contenido almacenado en el repositorio sobre el elemento que se acaba de crear
            tdCodigo.innerHTML = x.codigo; //Se accede al atributo name del objeto x
            tdNombre.innerHTML = x.nombreprod;
            tdCategoria.innerHTML = x.categoria;
            tdPrecio.innerHTML = x.precioin;
            tdButton.appendChild(btnEdit);

            //Botón Editar
            btnEdit.textContent = 'Modificar'; 
            btnEdit.className = 'boton_modtabla boton '; 
            btnEdit.id = "edit";
            btnEdit.addEventListener('click', function () {
                editFromLocalStorage2(i, ind);
            });

            tdButton.className = "botones";
            tdButton.style.display = tipo;
            tr.appendChild(tdCheck);
            tr.appendChild(tdCodigo); 
            tr.appendChild(tdNombre);
            tr.appendChild(tdCategoria);
            tr.appendChild(tdPrecio);
            tr.appendChild(tdButton);
            gridBody.appendChild(tr);
        });
    }
}

function loadFromLocalStorage2() { //Cargar info en la tabla grande
    var gridBody = document.querySelector("#grid tbody"); /*Selecciona la tabla que se quiere editar*/
    var compras = []; /*Arreglo para almacenar los datos del localstorage*/
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); //cadena

    if (dataInLocalStorage !== null) { /*Si hay datos, se van almacenando*/
        compras = JSON.parse(dataInLocalStorage); 
    }
    gridBody.innerHTML = ''; /*Poner en blanco el tbody de la tabla grid*/

    compras.forEach(function (x, i) { /*Recorrer un vector-----función anonima. X almacena el objeto*/
        var tr = document.createElement("tr"), 
            tdCheck = document.createElement("td"),
            inputCheck = document.createElement("input"),
            tdProveedor = document.createElement("td"),
            tdFecha = document.createElement("td"),
            tdButtons = document.createElement("td"),
            btnEdit = document.createElement("button"),
            btnRemove = document.createElement("button");

        inputCheck.type = 'checkbox';
        tdCheck.appendChild(inputCheck);
        
        tdProveedor.innerHTML = x.proveedor; //Se accede al atributo name del objeto x
        tdFecha.innerHTML = x.fecha;

        //Botón Editar
        btnEdit.textContent = 'Modificar'; 
        btnEdit.className = 'boton_mod boton'; //Agregar una clase
        btnEdit.addEventListener('click', function () {
            ind = i;
            editFromLocalStorage(i);
            const formulario = proveedor2.parentElement;
            const formulario2 = fecha2.parentElement;
            formulario.className = 'formulario';
            formulario2.className = 'formulario'
        });
        tdButtons.appendChild(btnEdit); 

        //Botón Eliminar
        btnRemove.textContent = 'Eliminar'; //Agregar un contenido que se llame Remove
        btnRemove.className = 'boton_eliminar boton'; //Agregar una clase
        btnRemove.addEventListener('click', function () {
            var confirmar = confirm("¿Desea eliminar la compra?");
            if (confirmar == true) {
                removeFromLocalStorage(i);
            } else {
            }
        });

        tdButtons.appendChild(btnRemove); //Para "concatenarlo" al documento --> Agregarlo a la celda
        tdButtons.className = "botones";
        tr.appendChild(tdCheck);
        //tr.appendChild(td);
        tr.appendChild(tdProveedor); //Para agregar el elemento a la columna
        tr.appendChild(tdFecha);
        tr.appendChild(tdButtons);
        gridBody.appendChild(tr);

    });

}

function editFromLocalStorage(index) {
    document.location.href = "#ventanamod";
    var compras = [], //vector de objetos
    dataInLocalStorage = localStorage.getItem(localStorageKeyName);
    compras = JSON.parse(dataInLocalStorage);
    document.getElementById('proveedor2').value = compras[index]["proveedor"];
    document.getElementById('fecha2').value = compras[index]["fecha"];

    var gridBody = document.querySelector("#grid3 tbody");
    loadFromLocalStorage(compras[index]["productos"], gridBody);

    document.querySelector('#btn-guardar2').addEventListener("click", function () { //Externo
     
        if (proveedor2.value.length === 0 || fecha2.value.length === 0) {
            checkInputs();
        } else {

            var prov = document.getElementById("proveedor2");
            var fec = document.getElementById("fecha2");
            compras[index]["proveedor"] = prov.value;
            compras[index]["fecha"] = fec.value;

            localStorage.setItem(localStorageKeyName, JSON.stringify(compras));
            loadFromLocalStorage2();
            
            dataInLocalStorage = localStorage.getItem(localStorageKeyName);
            compras = JSON.parse(dataInLocalStorage);
            //console.log(compras);
            document.location.href = "#";
            const formulario = proveedor2.parentElement;
            const formulario2 = fecha2.parentElement;
            formulario.className = 'formulario';
            formulario2.className = 'formulario';      
        }
    });
}

function editFromLocalStorage2(index, ind) { //index corresponde al indice del producto seleccionado, ind corresponde al indice de la compra (en general) seleccionada

    document.location.href = "#ventanaproducmod";
    var compras = [], //vector de objetos
    dataInLocalStorage = localStorage.getItem(localStorageKeyName);
    compras = JSON.parse(dataInLocalStorage);
    document.getElementById('codigo2').value = compras[ind]["productos"][index].codigo;
    document.getElementById('nombreprod2').value = compras[ind]["productos"][index].nombreprod;
    document.getElementById('categoria2').value = compras[ind]["productos"][index].categoria;
    document.getElementById('ubicacion2').value = compras[ind]["productos"][index].ubicacion;
    document.getElementById('precioin2').value = compras[ind]["productos"][index].precioin;
    document.getElementById('preciout2').value = compras[ind]["productos"][index].preciout;
    document.getElementById('descr2').value = compras[ind]["productos"][index].descr;
    document.getElementById('unidad2').value = compras[ind]["productos"][index].unidad;
    document.getElementById('pres2').value = compras[ind]["productos"][index].pres;

    document.querySelector('#btn-guardarcambios').addEventListener("click", function () {
        if (codigo2.value.length === 0 || categoria2.value.length === 0 || precioin2.value.length === 0 || descr2.value.length === 0 || pres2.value.length === 0 || nombreprod2.value.length === 0 || ubicacion2.value.length === 0 || preciout2.value.length === 0 || unidad2.value.length === 0) {
            checkInputs2();
        } else {
            var cod = document.getElementById("codigo2");
            var nom = document.getElementById("nombreprod2");
            var cat = document.getElementById("categoria2");
            var ubi = document.getElementById("ubicacion2");
            var prein = document.getElementById("precioin2");
            var preout = document.getElementById("preciout2");
            var des = document.getElementById("descr2");
            var uni = document.getElementById("unidad2");
            var pres = document.getElementById("pres2");
            compras[ind]["productos"][index].codigo = cod.value;
            compras[ind]["productos"][index].nombreprod = nom.value;
            compras[ind]["productos"][index].categoria = cat.value;
            compras[ind]["productos"][index].ubicacion = ubi.value;
            compras[ind]["productos"][index].precioin = prein.value;
            compras[ind]["productos"][index].preciout = preout.value;
            compras[ind]["productos"][index].descr = des.value;
            compras[ind]["productos"][index].unidad = uni.value;
            compras[ind]["productos"][index].pres = pres.value;
            //localStorage.setItem(localStorageKeyName, JSON.stringify(compras)); //Almacena todos nuevamente
            var gridBody = document.querySelector("#grid3 tbody");
            loadFromLocalStorage(compras[ind]["productos"], gridBody, "");
            localStorage.setItem(localStorageKeyName, JSON.stringify(compras));
            document.location.href = "#ventanamod";
        }
    });

    document.querySelector('#btn-guardar2').addEventListener("click", function () { 
        //console.log(JSON.stringify(compras));
        localStorage.setItem(localStorageKeyName, JSON.stringify(compras));
    }); 
}

function removeFromLocalStorage(index) {
    var compras = []; //vector de objetos
    dataInLocalStorage = localStorage.getItem(localStorageKeyName); //cadena

    compras = JSON.parse(dataInLocalStorage); //objeto
    compras.splice(index, 1);

    localStorage.setItem(localStorageKeyName, JSON.stringify(compras)); //Almacena todos nuevamente, menos el que borré. (se sobreescriben los datos, si tenia 4 ahora tendré3)
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

