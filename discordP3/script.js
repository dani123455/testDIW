// Array de canciones disponibles para reproducir
const canciones = [
    "audio/bad.mp3",   
    "audio/eladio.mp3",
    "audio/ruger.mp3",  
    "audio/star.mp3"    
];

// Declaración de variables necesarias en el código
let actual;  // Índice de la canción actual que se está reproduciendo
const audio = document.getElementById('miAudio');  // Elemento de audio en el HTML
const aleatorio = Math.floor(Math.random() * canciones.length);  // Índice de una canción aleatoria
let texto = ['JOINING SERVER', 'PREPARING ASSETS', 'ESTABLISHING CONNECTION'];  // Mensajes para el texto dinámico
let cuadroTexto = document.getElementById('textoDinamico');  // Elemento HTML donde se muestra el texto dinámico
let index = 0;  // Índice para recorrer los mensajes de texto
let estaMute = false;  // Estado para saber si el audio está silenciado
const muteButton = document.getElementById('mute');  // Botón de mutear/desmutear
let btnPlay = document.getElementById('btnPlay');

// Función que se ejecuta cuando se carga la página para empezar la canción aleatoria
window.onload = function() {
    btnPlay.addEventListener('click', function() {
        actual = aleatorio; 
        audio.src = canciones[actual];
        audio.play();
    });
};

// Función para cambiar a la siguiente canción en el array
function siguiente() {
    actual = (actual + 1) % canciones.length;  
    audio.src = canciones[actual];  
    audio.play(); 
}

// Función para cambiar a la canción anterior en el array
function anterior() {
    actual = (actual - 1 + canciones.length) % canciones.length;  
    audio.src = canciones[actual];  
    audio.play();  
}

// Asignamos los botones de "siguiente" y "anterior" para cambiar la canción
document.getElementById('btnSiguiente').addEventListener('click', siguiente);
document.getElementById('btnAnterior').addEventListener('click', anterior);

//cambiar la canción usando las teclas de flechas 
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        siguiente();  
        event.preventDefault();  
    } else if (event.key === 'ArrowLeft') {
        anterior();  
        event.preventDefault();  
    }
});

// Función para subir el volumen del audio
function volumenSubir() {
    if (audio.volume < 1.0) { 
        audio.volume = Math.min(audio.volume + 0.1, 1.0);  
    }
}

// Función para bajar el volumen del audio
function volumenBajar() {
    if (audio.volume > 0.0) { 
        audio.volume = Math.max(audio.volume - 0.1, 0.0);  
}
}
// ajustar el volumen usando las teclas de flechas 
document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowUp') {
        event.preventDefault();  
        volumenSubir();  
    } else if(event.code === 'ArrowDown') {
        event.preventDefault();  
        volumenBajar();  
    }
});

// Asignamos los botones de "aumentar volumen" y "disminuir volumen"
document.getElementById('btnAumentar').addEventListener('click', volumenSubir);
document.getElementById('btnDisminuir').addEventListener('click', volumenBajar);

// Función que actualiza el texto dinámico en la interfaz cada 2 segundos
function actualizarTexto() {
    cuadroTexto.innerText = texto[index];  
    index = (index + 1) % texto.length;  
}

// Llama a la función de actualizar texto cada 2 segundos
setInterval(actualizarTexto, 2000);

// Función que silencia o activa el sonido del audio
function mute() {
    estaMute = !estaMute;  
    miAudio.muted = estaMute;  


    if (estaMute) {
        muteButton.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';  
    } else {
        muteButton.innerHTML = '<i class="bi bi-volume-up-fill">';  
    }
}

// Asignamos el evento de clic en el botón para mutear o desmutear
muteButton.addEventListener('click', mute);

// Permite mutear o desmutear con la tecla "espacio"
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();  
        mute();  
    }
});

muteButton.innerHTML = '<i class="bi bi-volume-up-fill">';
