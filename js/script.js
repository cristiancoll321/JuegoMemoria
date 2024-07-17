const tablero = document.getElementById('tablero');
const images = [
    'image1.png', 'image1.png', 'image2.png', 'image2.png',
    'image3.png', 'image3.png', 'image4.png', 'image4.png',
    'image5.png', 'image5.png', 'image6.png', 'image6.png',
    'image7.png', 'image7.png', 'image8.png', 'image8.png'
];
let tarjetasVolteadas = [];
let tarjetasEmparejadas = [];
let crono;
let tiempoInicio;
let btnIniciar = $('#iniciar');

function barajar(array) {
    array.sort(() => Math.random() - 0.5);
}

function crearTablero() {
    barajar(images);
    for (let i = 0; i < images.length; i++) {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');
        tarjeta.dataset.valor = images[i];
        const img = document.createElement('img');
        img.src = `images/${images[i]}`;
        img.style.display = 'none';
        tarjeta.appendChild(img);
        tablero.appendChild(tarjeta);
        tarjeta.addEventListener('click', voltearTarjeta);
    }
}

function voltearTarjeta() {
    if (tarjetasVolteadas.length < 2 && !this.classList.contains('volteada')) {
        this.classList.add('volteada');
        this.querySelector('img').style.display = 'block';  
        tarjetasVolteadas.push(this);

        if (tarjetasVolteadas.length === 2) {
            setTimeout(verificarPareja, 500);
        }
    }
}

function verificarPareja() {
    const [tarjeta1, tarjeta2] = tarjetasVolteadas;
    if (tarjeta1.dataset.valor === tarjeta2.dataset.valor) {
        tarjetasEmparejadas.push(tarjeta1, tarjeta2);
        if (tarjetasEmparejadas.length === images.length) {
            detenerCrono();
            alert(`¡Ganaste! Tiempo total: ${document.getElementById('crono').textContent}`);
        }
    } else {
        tarjeta1.classList.remove('volteada');
        tarjeta1.querySelector('img').style.display = 'none';
        tarjeta2.classList.remove('volteada');
        tarjeta2.querySelector('img').style.display = 'none';
    }
    tarjetasVolteadas = [];
}

btnIniciar.on('click',iniciarCrono)

function iniciarCrono() {
    tiempoInicio = Date.now();
    crono = setInterval(actualizarCrono, 1000);
}

function actualizarCrono() {
    const tiempoActual = Date.now();
    const tiempoTranscurrido = Math.floor((tiempoActual - tiempoInicio) / 1000);
    document.getElementById('crono').textContent = `Tiempo: ${tiempoTranscurrido} s`;
}

function detenerCrono() {
    clearInterval(crono);
}

function reiniciarJuego() {
    tablero.innerHTML = '';
    document.getElementById('crono').textContent = `Tiempo: 0 s`;
    tarjetasEmparejadas = [];
    tarjetasVolteadas = [];
    crearTablero();
}
//document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);

crearTablero();
