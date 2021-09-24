var localStorageKeyName = 'usuarios'; 
var users = { 'usuario':'admin', 'contraseña':'admin123'};

// Guardo el objeto como un string
localStorage.setItem('usuarios', JSON.stringify(usuario));

document.querySelector('#btn-iniciar').addEventListener("click",function(){
    var usuario = document.getElementById("usuario");
    var contra = document.getElementById("contra");
        checkInputs();
     if (usuario.value == users.usuario && contra.value == users.contraseña){
        console.log("entro al principal admn");
        usuario.value='';
        document.location.href = "principal_admin.html";
    }

});

function checkInputs(){
    if (contra.value.length === 0){
        mensajeError(contra,"Campo obligatorio");
    }else if(contra.value !== users.contraseña){
        mensajeError(contra,"Contraseña incorrecta");
        contra.value='';
    }
    if (usuario.value.length === 0){
        mensajeError(usuario,"Campo obligatorio");
    }else if(usuario.value == users.usuario){
        mensajeCorrecto(usuario, "Usuario correcto");
    }else{
        mensajeError(usuario,"Usuario incorrecto");
       contra.value = '';
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
    const small = formulario.querySelector('small'); 
    formulario.className = 'formulario correcto'; 
    small.innerText = message;
}




