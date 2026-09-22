// Archivo de JavaScript del proyecto.
// Se empieza a trabajar en la sesión 4.
// El código se escribe debajo de este comentario.
//console.log("el script se esta ejecutando");

const boton = document.querySelector("#ver-mas");

const extra = document.querySelector("#proyectos-extra");

boton.addEventListener("click", function () {
    extra.classList.toggle("oculto");
});