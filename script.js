
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

function mostrarImagen(carta, id) {
    carta.innerHTML = `<img src="./imagenes/${id}.png" alt=""/>`;
    carta.disabled = true;
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
