
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

