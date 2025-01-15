const temas = document.getElementById('temas');
const root = document.documentElement; 
const botonFondo = document.getElementById('botonFondo');
const containerFondo = document.getElementById('containerFondo');
const click = document.getElementById('click');
let contador = 0;
let contador2 = 0;
const progreso = document.getElementById('progreso');
const progreso2 = document.getElementById('progreso%');




//cambiar tema
const guardado = localStorage.getItem('theme');
if (guardado) {
    root.classList.add(guardado); 
}

// Función para alternar el tema
temas.addEventListener('click', function() {
    if (root.classList.contains('tema-oscuro')) {
        root.classList.remove('tema-oscuro');
        localStorage.setItem('theme', ''); 
    } else {
        root.classList.add('tema-oscuro');
        localStorage.setItem('theme', 'tema-oscuro'); 
    }
});

//Funcion para cambiar color del fondo 

function colorRamdom() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    containerFondo.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

if (botonFondo) {
    botonFondo.addEventListener('click', colorRamdom);
}




//contador de cliks
click.addEventListener('click', function(){
    contador++;
    document.getElementById('contador').textContent = 'Clicks: ' + contador; 
})


//Barra progreso 

window.addEventListener('scroll', function() {
    let scroll = document.documentElement.scrollTop; 
    let scrollAbajo = document.documentElement.scrollHeight; 

    
    if (scroll < scrollAbajo) {
        if (contador2 < 100) { 
            contador2++;
            progreso.value = contador2; 
            progreso2.innerHTML = contador2 + '%';
        }
    }
});


//Arreglar progreso añadir boton de ir arriba , dar bienvenida , leer pagina y aumentar texto 