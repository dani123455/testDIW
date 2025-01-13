const temas = document.getElementById('temas');
const root = document.documentElement; 
const click = document.getElementById('click');
let contador = 0;



//cambiar tema
const guardado = localStorage.getItem('theme');
if (guardado) {
    root.classList.add(guardado); 
}

// Función para alternar el tema
temas.addEventListener('click', function() {
    if (root.classList.contains('dark-theme')) {
        root.classList.remove('dark-theme');
        localStorage.setItem('theme', ''); 
    } else {
        root.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme'); 
    }
});

//contador de cliks
click.addEventListener('click', function(){
    contador++;
    document.getElementById('contador').textContent = 'Clicks: ' + contador; 
})
