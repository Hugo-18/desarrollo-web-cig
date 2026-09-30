// Archivo de JavaScript del proyecto.

// ==================================================
// PROYECTOS
// ==================================================

const boton = document.getElementById("ver-mas");
const extra = document.getElementById("proyectos-extra");

if (boton && extra) {
    boton.addEventListener("click", function () {
        extra.classList.toggle("oculto");
    });
}


// ==================================================
// FORMULARIO DE CONTACTO
// ==================================================

const formulario = document.querySelector("#contacto");

if (formulario) {

    const nombre = document.querySelector("#nombre");
    const correo = document.querySelector("#correo");
    const mensaje = document.querySelector("#mensaje");

    const errorNombre = document.querySelector("#error-nombre");
    const errorCorreo = document.querySelector("#error-correo");
    const errorMensaje = document.querySelector("#error-mensaje");

    const exito = document.querySelector("#mensaje-exito");


    // Marca un campo como inválido y muestra el error
    function marcar(campo, parrafo, texto) {

        parrafo.textContent = texto;

        if (texto === "") {
            campo.classList.remove("campo-invalido");
        } else {
            campo.classList.add("campo-invalido");
        }
    }


    // Muestra el mensaje final del formulario
    function mostrarExito(texto) {
        exito.textContent = texto;
        exito.classList.remove("oculto");
    }


    // Evento al enviar el formulario
    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        // Ocultar mensaje anterior
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

        } else if (correo.value.indexOf(".", posArroba) === -1) {

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


        // Si todo es válido, enviar a FormSubmit
        if (valido) {

            fetch("https://formsubmit.co/ajax/hugocifuentescifuentes@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    nombre: nombre.value,
                    correo: correo.value,
                    mensaje: mensaje.value,
                    _captcha: "false"
                })
            })
            .then(function () {
                formulario.reset();
                mostrarExito("Su mensaje fue enviado.");
            })
            .catch(function () {
                mostrarExito("No se pudo enviar.");
            });
        }

    });
}