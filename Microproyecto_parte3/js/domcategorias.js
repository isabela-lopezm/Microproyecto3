var localStorageKeyName = 'categorias'; /*El "repositorio" (tabla) se llama data y es aquí donde se van a guardar todos los usuarios.
                                        Si se quieren almacenar, por ejemplo, productos, crear otro repositorio, si se quieren almacenar ventas, crear otro....*/

loadFromLocalStorage(); /*Se pone al inicio para que se ejecute apenas se cargue la página*/

document.querySelector('#btn-guardar').addEventListener("click", function () {
    var categorias = [];
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); /*Cadena*/
    if (dataInLocalStorage !== null) { 
        categorias = JSON.parse(dataInLocalStorage); 
    }
    bandera = 0;
    var categoria = document.getElementById("categoria");
    if (categoria.value.length === 0) {
        checkInputs();
    } else {
        for (let i = 0; i <= categorias.length; i++) {
            if (typeof categorias[i] != "undefined") {
                if (categoria.value == categorias[i].categoria) {
                    bandera = 1;
                }
            }
        }

        if (bandera == 0) {
            var cate = {
                categoria: categoria.value
            }
            categoria.value = '';
            appendObjectToLocalStorage(cate);
            document.location.href = "#"
            const formulario = categoria.parentElement;
            formulario.className = 'cate'; 
            const formulario2 = categoria2.parentElement;
            formulario2.className = 'cate';
        } else {
            mensajeError(categoria, "Ya existe una categoría con este nombre");
        }
    }
});


function checkInputs() {
    if (categoria.value.length === 0) {
        mensajeError(categoria, "Campo obligatorio");
    }
    if (categoria2.value.length === 0) {
        mensajeError(categoria2, "Campo obligatorio");
    }
}

function mensajeError(input, message) {
    const formulario = input.parentElement;
    const small = formulario.querySelector('small'); //Se selecciona el elemento small mediante su etiqueta
    formulario.className = 'formulario error'; //se defne una clase (es la que en el css aparece como visibility: visible)
    small.innerText = message;
}

function appendObjectToLocalStorage(obj) { /*Esta funcion Recibe el objeto que se acaba de crear y lo almacena en el local storage*/
    var categorias = [];
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); /*Cadena*/

    if (dataInLocalStorage != null) {
        categorias = JSON.parse(dataInLocalStorage); /*Users es un objeto */
    }

    categorias.push(obj); /*Objeto JSON*/
    localStorage.setItem(localStorageKeyName, JSON.stringify(categorias));
    loadFromLocalStorage(); //Se llama aqui para que cuando se agregue uno nuevo, lo cargue inmediantamente (sin tener que refrscar la página)
}


function loadFromLocalStorage() { /*Esta funcion crea las filas, celdas para mostrar la info*/
    var gridBody = document.querySelector("#grid tbody"); /*Selecciona la tabla que se quiere editar*/
    var categorias = []; /*Arreglo para almacenar los datos del localstorage*/
    var dataInLocalStorage = localStorage.getItem(localStorageKeyName); //cadena

    if (dataInLocalStorage !== null) { /*Si hay datos, se van almacenando*/
        categorias = JSON.parse(dataInLocalStorage); /*users es un  arreglo de objeto*/
    }
    gridBody.innerHTML = ''; 

    categorias.forEach(function (x, i) { /*Recorrer un vector-----función anonima. X almacena el objeto*/
        var tr = document.createElement("tr"), //Por cada registro se crea esto
            tdCheck = document.createElement("td"),
            inputCheck = document.createElement("input"),
            tdCategoria = document.createElement("td"),
            tdButtons = document.createElement("td"),
            btnEdit = document.createElement("button"),
            btnRemove = document.createElement("button");

        inputCheck.type = 'checkbox';
        tdCheck.appendChild(inputCheck);

        //Agregar el contenido almacenado en el repositorio sobre el elemento que se acaba de crear
        tdCategoria.innerHTML = x.categoria; //Se accede al atributo name del objeto x

        //Botón Editar
        btnEdit.textContent = 'Modificar'; //Agregar un contenido que se llame Modificar
        btnEdit.className = 'boton_mod boton'; //Agregar una clase
        btnEdit.addEventListener('click', function () {
            editFromLocalStorage(i);
        });
        tdButtons.appendChild(btnEdit); //Para "concatenarlo" al documento --> Agregarlo a la columna

        //Botón Eliminar
        btnRemove.textContent = 'Eliminar'; //Agregar un contenido que se llame Remove
        btnRemove.className = 'boton_eliminar boton'; //Agregar una clase
        btnRemove.addEventListener('click', function () {
            var confirmar = confirm("¿Desea eliminar la categoría?");
            if (confirmar == true) {
                removeFromLocalStorage(i);
            } else {
            }
        });
        tdButtons.appendChild(btnRemove); //Para "concatenarlo" al documento --> Agregarlo a la celda

        tdButtons.className = "botones";
        tr.appendChild(tdCheck);
        tr.appendChild(tdCategoria); //Para agregar el elemento a la columna
        tr.appendChild(tdButtons);
        gridBody.appendChild(tr);
    });
}

function editFromLocalStorage(index) {
    document.location.href = "#ventanamod"

    var categorias = [], //vector de objetos
        dataInLocalStorage = localStorage.getItem(localStorageKeyName);

    categorias = JSON.parse(dataInLocalStorage);
    //console.log(categorias[index]["categoria"]);  //Se obtiene la info de una pos en especifico----ir a la pos index y que muestre el nombre

    document.getElementById('categoria2').value = categorias[index]["categoria"];
    document.querySelector('#btn-guardar2').addEventListener("click", function () {

        bandera = 0;
        var categoria2 = document.getElementById("categoria2");
        if (categoria2.value.length === 0) {
            checkInputs();
        } else {
            for (let i = 0; i < categorias.length; i++) {
                if (categoria2.value == categorias[i].categoria) {
                    bandera = 1;
                    if (categorias[index].categoria == categorias[i].categoria) {
                        bandera = 2;
                    }
                }
            }

            if (bandera == 0 || bandera == 2) {
                var cat = document.getElementById("categoria2");
                categorias[index]["categoria"] = cat.value;

                localStorage.setItem(localStorageKeyName, JSON.stringify(categorias)); //Almacena todos nuevamente
                loadFromLocalStorage();
                document.location.href = "#"
                const formulario = categoria2.parentElement;
                formulario.className = 'cate';

            } else {
                document.location.href = "#ventanamod"
                mensajeError(categoria2, "Ya existe una categoría con este nombre");
            }
        }
    });
}


function removeFromLocalStorage(index) {
    var users = []; //vector de objetos
    dataInLocalStorage = localStorage.getItem(localStorageKeyName); //cadena

    users = JSON.parse(dataInLocalStorage); //objeto
    users.splice(index, 1);//recibe dos parametros

    localStorage.setItem(localStorageKeyName, JSON.stringify(users)); //Almacena todos nuevamente, menos el que borré. (se sobreescriben los datos, si tenia 4 ahora tendré3)
    loadFromLocalStorage();
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









