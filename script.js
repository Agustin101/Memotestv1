
document.addEventListener("DOMContentLoaded", comenzarJuego);
$tablero.addEventListener("click", obtenerCarta);

function comenzarJuego() {
    mezclarCartas();
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
