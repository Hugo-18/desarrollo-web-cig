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


// === PROYECTOS DESDE ARCHIVO DE DATOS (solo perfil.html) ===
// Requiere en perfil.html:  <div class="tarjetas" id="tarjetas"></div>
// Requiere el archivo:      datos/proyectos.json
// Y requiere Live Server: con doble clic sobre el archivo, fetch falla.
const contenedor = document.querySelector("#tarjetas");

function dibujarTarjetas(proyectos) {
    contenedor.innerHTML = "";

    proyectos.forEach(function (proyecto) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "proyecto";

        tarjeta.innerHTML = `
            <h3>${proyecto.nombre}</h3>
            <p>${proyecto.descripcion}</p>
        `;

        contenedor.appendChild(tarjeta);
    });
}

if (contenedor) {
    fetch("datos/proyectos.json")
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("Error en la respuesta de la red");
            }
            return respuesta.json();
        })
        .then(function (proyectos) {
            dibujarTarjetas(proyectos);
        })
        .catch(function (error) {
            console.error("Error al cargar los proyectos:", error);
            contenedor.innerHTML = "<p>No se pudieron cargar los proyectos.</p>";
        });
}


// ==================================================
// FORMULARIO DE CONTACTO
// ==================================================

const formulario = document.querySelector("#contacto");

if (formulario) {

    const mensajeExito = document.querySelector("#mensaje-exito");

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const datos = new FormData(formulario);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: datos
        })
        .then(function (respuesta) {

            if (!respuesta.ok) {
                throw new Error("Error al enviar");
            }

            return respuesta.json();
        })
        .then(function (resultado) {

            if (resultado.success) {
                formulario.reset();

                mensajeExito.textContent = "Su mensaje fue enviado correctamente.";
                mensajeExito.classList.remove("oculto");
            } else {
                throw new Error("Web3Forms rechazó el envío");
            }

        })
        .catch(function (error) {

            console.error(error);

            mensajeExito.textContent = "No se pudo enviar el mensaje.";
            mensajeExito.classList.remove("oculto");

        });

    });
}