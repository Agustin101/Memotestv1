const $tablero = document.querySelector("#tablero-memotest");
let cartas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let turnoActual = [];
let cartasDestapadas = 0;
let movimientos = 0;
let aciertos = 0;
let cuadros = [];
let timer = false;
let tiempoActual = 40;
let contadorDeTiempo;

document.addEventListener("DOMContentLoaded", comenzarJuego);
$tablero.addEventListener("click", obtenerCarta);

function comenzarJuego() {
    mezclarCartas();
}

function obtenerCarta(e) {
    const $carta = e.target;

    if ($carta.classList.contains("boton")) {
        if (timer === false) {
            ocultarIndicacion();
            iniciarContador();
            timer = true;
        }

        cuadros = [...cuadros, $carta];
        turnoActual = [...turnoActual, cartas[$carta.id]];
        actualizarMovimientos();
        cartasDestapadas++;

        if (cartasDestapadas === 1) {
            let primeraEleccion = cartas[$carta.id];
            mostrarImagen($carta, primeraEleccion);
        } else {
            let segundaEleccion = cartas[$carta.id];
            mostrarImagen($carta, segundaEleccion);
        }

        if (turnoActual.length === 2) {
            evaluarTurno();
        }
    }
}

function mezclarCartas() {
    cartas = cartas.sort(() => {
        return Math.random() - 0.5;
    });
}

function actualizarMovimientos() {
    movimientos++;
    let $estadisticaMovimientos = document.querySelector(
        "#tablero-movimientos"
    );
    $estadisticaMovimientos.innerHTML = `Movimientos ${movimientos}`;
}

function actualizaAciertos() {
    aciertos++;
    let $estadisticaAciertos = document.querySelector("#tablero-aciertos");
    $estadisticaAciertos.innerHTML = `Aciertos ${aciertos}`;
}

function mostrarImagen(carta, id) {
    carta.innerHTML = `<img src="./imagenes/${id}.png" alt=""/>`;
    carta.disabled = true;
}

function evaluarTurno() {
    if (turnoActual[0] === turnoActual[1]) {
        actualizaAciertos();
        actualizaClaseCuadros();
        verificarFinDelJuego();
        reiniciarTurno();
    } else {
        setTimeout(() => {
            jugadorFallo();
            reiniciarTurno();
        }, 800);
    }
}

function actualizaClaseCuadros() {
    cuadros[0].classList.remove("boton");
    cuadros[1].classList.remove("boton");
    cuadros[0].classList.add("carta-correcta");
    cuadros[1].classList.add("carta-correcta");
}

function verificarFinDelJuego() {
    const $cartas = document.querySelectorAll(".boton");

    if ($cartas.length === 0) {
        let tiempoRestante = 40;
        tiempoRestante -= tiempoActual;
        clearInterval(contadorDeTiempo);
        const titulo = document.createElement("div");
        titulo.classList.add("h3", "fin-juego");
        const $tablero = document.querySelector(".section-1");
        titulo.textContent = `Ganaste en ${tiempoRestante} segundos!`;
        $tablero.appendChild(titulo);
    }
}

function reiniciarTurno() {
    turnoActual = [];
    cuadros = [];
    cartasDestapadas = 0;
}

function jugadorFallo() {
    cuadros[0].innerHTML = ``;
    cuadros[1].innerHTML = ``;
    cuadros[0].disabled = false;
    cuadros[1].disabled = false;
}

function iniciarContador() {
    const $tiempo = document.querySelector("#tablero-tiempo");
    contadorDeTiempo = setInterval(() => {
        tiempoActual--;
        $tiempo.textContent = `Tiempo ${tiempoActual} segundos `;

        if (tiempoActual === 0) {
            clearInterval(contadorDeTiempo);
            finalizarJuego();
        }
    }, 1000);
}

function finalizarJuego() {
    const $cuadros = document.querySelectorAll(".boton");
    const $titulo = document.querySelector(".titulo");
    $titulo.textContent = "Perdiste!";
    $cuadros.forEach((cuadro, i) => {
        cuadro.innerHTML = `<img src="./imagenes/${cartas[i]}.png" alt=""/>`;
        cuadro.disabled = true;
    });
}

function ocultarIndicacion() {
    const $subtitulo = document.querySelector(".h6");
    $subtitulo.innerText = " ";
}
