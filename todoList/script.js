let todas = [];
let completadas = [];
let pendientes = [];

let input = $('#inputTarea');
let botonAñadir = $('#botonAñadir');
let formulario = $('#formulario');
let mensajeError = $('#error');
let tablaTareas = $('#tablaTareas');

const tarea = $('#inputTarea');


function agregar() {
    formulario.on('submit', function(event) {
        event.preventDefault(); 

        
        if (tarea.val().trim() === '') { 
            mensajeError.removeClass('d-none');  
        } else {
            mensajeError.addClass('d-none');
            let tareaText = tarea.val().trim(); 
            todas.push(tareaText); 
            pendientes.push(tareaText);
            input.val(''); 
            actualizarTabla(tareaText);
        }
    });
}


function actualizarTabla(tareaText) {
    
    if (tareaText !== '') {
        let nuevaFila = `<tr><td>${tareaText}</td></tr>`; 

        
        tablaTareas.append(nuevaFila);
    }
}


agregar();
