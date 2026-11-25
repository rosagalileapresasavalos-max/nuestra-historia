
// =====================================
// GALERÍA INTERACTIVA DE FOTOGRAFÍAS
// =====================================

let fotoActual = 0;

const fotos = document.querySelectorAll(".foto-boton");
const visor = document.getElementById("visor");

function abrirRecuerdo(boton) {
    const imagen = boton.querySelector("img");

    document.getElementById("imagen-ampliada").src = imagen.src;
    document.getElementById("titulo-ampliado").textContent = boton.dataset.titulo;
    document.getElementById("fecha-ampliada").textContent = boton.dataset.fecha;
    document.getElementById("descripcion-ampliada").textContent = boton.dataset.descripcion;

    visor.classList.add("activo");
    visor.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function cerrarRecuerdo() {
    visor.classList.remove("activo");
    visor.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// Cerrar al presionar fuera de la fotografía
visor.addEventListener("click", function(event) {
    if (event.target === visor) {
        cerrarRecuerdo();
    }
});

// Cerrar con la tecla Escape
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        cerrarRecuerdo();
    }
});

// =====================================
// CONTROLES DEL CARRUSEL DE FOTOGRAFÍAS
// =====================================

let indiceFoto = 0;

const pistaFotos = document.getElementById("pista-fotos");
const diapositivas = document.querySelectorAll(".diapositiva-foto");
const indicadores = document.querySelectorAll(".indicador");
const contadorFotos = document.getElementById("contador-fotos");

function mostrarFoto(indice) {

    const totalFotos = diapositivas.length;

    if (totalFotos === 0) return;

    // Permitir avanzar desde la última hasta la primera
    if (indice >= totalFotos) {
        indiceFoto = 0;
    } else if (indice < 0) {
        indiceFoto = totalFotos - 1;
    } else {
        indiceFoto = indice;
    }

    // Mover la pista
    pistaFotos.style.transform = `translateX(-${indiceFoto * 100}%)`;

    // Actualizar fotografía activa
    diapositivas.forEach((foto, i) => {
        foto.classList.toggle("activa", i === indiceFoto);
    });

    // Actualizar indicadores
    indicadores.forEach((indicador, i) => {
        indicador.classList.toggle("activo", i === indiceFoto);
    });

    // Actualizar contador
    contadorFotos.textContent =
        `${String(indiceFoto + 1).padStart(2, "0")} / ${String(totalFotos).padStart(2, "0")}`;
}

// Botón siguiente y anterior
function cambiarFoto(direccion) {
    mostrarFoto(indiceFoto + direccion);
}

// Elegir una fotografía directamente
function irAFoto(indice) {
    mostrarFoto(indice);
}

// =====================================
// DESLIZAMIENTO EN CELULARES
// =====================================

let inicioDeslizamiento = 0;
let finalDeslizamiento = 0;

const ventanaCarrusel = document.querySelector(".ventana-carrusel");

ventanaCarrusel.addEventListener("touchstart", function(event) {
    inicioDeslizamiento = event.changedTouches[0].screenX;
}, { passive: true });

ventanaCarrusel.addEventListener("touchend", function(event) {

    finalDeslizamiento = event.changedTouches[0].screenX;

    const distancia = finalDeslizamiento - inicioDeslizamiento;

    if (Math.abs(distancia) > 50) {

        if (distancia < 0) {
            cambiarFoto(1);
        } else {
            cambiarFoto(-1);
        }

    }

}, { passive: true });

// Mostrar la primera fotografía al iniciar
mostrarFoto(0);

// =====================================
// REPRODUCTOR CINEMATOGRÁFICO DE VIDEOS
// =====================================

const visorVideo = document.getElementById("visor-video");
const videoAmpliado = document.getElementById("video-ampliado");
const tituloVideo = document.getElementById("titulo-video");

// ABRIR VIDEO

function abrirVideo(boton) {

    const rutaVideo = boton.dataset.video;
    const titulo = boton.dataset.titulo;

    // Colocar el video seleccionado
    videoAmpliado.pause();
    videoAmpliado.src = rutaVideo;
    videoAmpliado.load();

    // Colocar su título
    tituloVideo.textContent = titulo;

    // Mostrar reproductor
    visorVideo.classList.add("activo");
    visorVideo.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    // Reproducir después de seleccionar
    videoAmpliado.play().catch(() => {
        console.log("Presiona reproducir para iniciar el video.");
    });
}

// CERRAR VIDEO

function cerrarVideo() {

    videoAmpliado.pause();

    // Detener el video y liberar el reproductor
    videoAmpliado.removeAttribute("src");
    videoAmpliado.load();

    visorVideo.classList.remove("activo");
    visorVideo.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

// =====================================
// PANTALLA COMPLETA
// =====================================

function pantallaCompletaVideo() {

    // Compatibilidad con pantalla completa en iPhone
    if (typeof videoAmpliado.webkitEnterFullscreen === "function") {

        videoAmpliado.webkitEnterFullscreen();

    } else if (videoAmpliado.requestFullscreen) {

        videoAmpliado.requestFullscreen();

    } else {
        console.log("La pantalla completa no está disponible en este dispositivo.");
    }

}

// =====================================
// CERRAR AL TOCAR FUERA DEL REPRODUCTOR
// =====================================

visorVideo.addEventListener("click", function(event) {

    if (event.target === visorVideo) {
        cerrarVideo();
    }

});

// =====================================
// CERRAR CON LA TECLA ESCAPE
// =====================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape" && visorVideo.classList.contains("activo")) {
        cerrarVideo();
    }

});


// =====================================
// CARTA INTERACTIVA PARA JAVIER
// =====================================

let cartaAbierta = false;
let temporizadorEscritura = null;
let mensajeOriginal = "";

function abrirCarta() {
    const sobre = document.getElementById("sobre-carta");
    const boton = document.getElementById("boton-carta");
    const mensaje = document.getElementById("mensaje-carta");

    if (!sobre || !boton || !mensaje) {
        console.error("No se encontraron los elementos de la carta.");
        return;
    }

    if (!cartaAbierta) {
        if (mensajeOriginal === "") {
            mensajeOriginal = mensaje.textContent.trim();
        }

        cartaAbierta = true;
        sobre.classList.add("abierta");
        boton.textContent = "CERRAR MI CARTA ✧";

        clearInterval(temporizadorEscritura);
        mensaje.textContent = "";

        let letra = 0;

        temporizadorEscritura = setInterval(() => {
            mensaje.textContent += mensajeOriginal.charAt(letra);
            letra++;

            if (letra >= mensajeOriginal.length) {
                clearInterval(temporizadorEscritura);
            }
        }, 45);

    } else {
        cartaAbierta = false;
        sobre.classList.remove("abierta");
        crearCorazones();
        boton.textContent = "ABRIR MI CARTA ✧";

        clearInterval(temporizadorEscritura);
        mensaje.textContent = mensajeOriginal;
    }
}

// =====================================
// CORAZONES FLOTANTES
// =====================================

function crearCorazones() {
    const contenedor = document.getElementById("corazones-carta");

    if (!contenedor) return;

    const colores = ["#F3AFC8", "#254B39"];
    const simbolos = ["♥", "♡"];

    for (let i = 0; i < 12; i++) {
        const corazon = document.createElement("span");

        corazon.classList.add("corazon-flotante");
        corazon.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];

        corazon.style.color = colores[Math.floor(Math.random() * colores.length)];
        corazon.style.left = Math.random() * 90 + 5 + "%";
        corazon.style.animationDelay = Math.random() * 1.5 + "s";

        contenedor.appendChild(corazon);

        setTimeout(() => {
            corazon.remove();
        }, 5500);
    }
}

// ==============================
// SORPRESA FINAL
// ==============================

const botonSorpresa = document.getElementById("botonSorpresa");
const regaloSorpresa = document.getElementById("regaloSorpresa");
const abrirRegalo = document.getElementById("abrirRegalo");
const mensajeSorpresa = document.getElementById("mensajeSorpresa");
const contenedorConfeti = document.getElementById("contenedorConfeti");
const cerrarSorpresa = document.getElementById("cerrarSorpresa");

// PRIMER CLIC: APARECE EL REGALO
botonSorpresa.addEventListener("click", function () {

    botonSorpresa.style.display = "none";
    regaloSorpresa.style.display = "flex";

    regaloSorpresa.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});

// SEGUNDO CLIC: SE ABRE EL REGALO
abrirRegalo.addEventListener("click", function () {

    abrirRegalo.classList.add("abierta");
    abrirRegalo.disabled = true;

    setTimeout(function () {

        mensajeSorpresa.style.display = "block";

        crearConfeti();

        mensajeSorpresa.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 700);

});

// CREAR CONFETI
function crearConfeti() {

    const colores = [
        "#F3AFC8",
        "#D5E8D8",
        "#FFDA79",
        "#9B8BFF",
        "#FFFFFF"
    ];

    for (let i = 0; i < 70; i++) {

        const pieza = document.createElement("span");

        pieza.classList.add("confeti");

        pieza.style.left = Math.random() * 100 + "%";

        pieza.style.backgroundColor =
            colores[Math.floor(Math.random() * colores.length)];

        pieza.style.animationDelay = Math.random() * 2 + "s";

        pieza.style.animationDuration =
            (3 + Math.random() * 3) + "s";

        contenedorConfeti.appendChild(pieza);

        setTimeout(function () {
            pieza.remove();
        }, 6500);

    }
}
// CERRAR Y REINICIAR LA SORPRESA
cerrarSorpresa.addEventListener("click", function () {

    mensajeSorpresa.style.display = "none";

    regaloSorpresa.style.display = "none";

    botonSorpresa.style.display = "inline-block";

    abrirRegalo.classList.remove("abierta");
    abrirRegalo.disabled = false;

    contenedorConfeti.innerHTML = "";

    document.getElementById("sorpresa").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});

// =====================================
// REPRODUCTOR DE MÚSICA
// =====================================

const musicaFondo = document.getElementById("musicaFondo");
const botonMusica = document.getElementById("botonMusica");

botonMusica.addEventListener("click", function () {

    if (musicaFondo.paused) {

        musicaFondo.play();

        botonMusica.textContent = "♫ Pausar música";

    } else {

        musicaFondo.pause();

        botonMusica.textContent = "♫ Reproducir música";

    }

});