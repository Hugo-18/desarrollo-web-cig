// Archivo de JavaScript del proyecto.
// Se empieza a trabajar en la sesión 4.
// El código se escribe debajo de este comentario.
//console.log("el script se esta ejecutando");

const boton = document.getElementById("ver-mas");
const extra = document.getElementById("proyectos-extra");

if (boton && extra) {
    boton.addEventListener("click", function () {
        extra.classList.toggle("oculto");
    });
}

const formulario = document.querySelector("#contacto");

if (formulario) {

    const nombre = document.querySelector("#nombre");
    const correo = document.querySelector("#correo");
    const mensaje = document.querySelector("#mensaje");

    const errorNombre = document.querySelector("#error-nombre");
    const errorCorreo = document.querySelector("#error-correo");
    const errorMensaje = document.querySelector("#error-mensaje");

    const exito = document.querySelector("#mensaje-exito");


    function marcar(campo, parrafo, texto) {

        parrafo.textContent = texto;

        if (texto === "") {
            campo.classList.remove("campo-invalido");
        } else {
            campo.classList.add("campo-invalido");
        }
    }


    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        // Ocultar mensaje de éxito anterior
        exito.textContent = "";
        exito.classList.add("oculto");

        let valido = true;


        // Validar nombre
        if (nombre.value.trim().length < 3) {

            marcar(
                nombre,
                errorNombre,
                "Escriba su nombre completo"
            );

            valido = false;

        } else {

            marcar(nombre, errorNombre, "");
        }


        // Validar correo
        const posArroba = correo.value.indexOf("@");

        if (correo.value.trim() === "") {

            marcar(
                correo,
                errorCorreo,
                "Escriba su correo"
            );

            valido = false;

        } else if (posArroba === -1) {

            marcar(
                correo,
                errorCorreo,
                "Al correo le falta la arroba"
            );

            valido = false;

        } else if (
            correo.value.indexOf(".", posArroba) === -1
        ) {

            marcar(
                correo,
                errorCorreo,
                "Al correo le falta el punto despues de la arroba"
            );

            valido = false;

        } else {

            marcar(correo, errorCorreo, "");
        }


        // Validar mensaje
        if (mensaje.value.trim().length < 10) {

            marcar(
                mensaje,
                errorMensaje,
                "Escriba un mensaje de al menos 10 letras"
            );

            valido = false;

        } else {

            marcar(mensaje, errorMensaje, "");
        }


        // SOLO si todo está correcto
        if (valido) {

            formulario.reset();

            exito.textContent =
                "Datos completos. Formulario enviado correctamente.";

            exito.classList.remove("oculto");
        }

    });
}