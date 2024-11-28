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
        let nuevaFila = `<tr>
                            <td>${tareaText}</td>
                            <td class="d-flex justify-content-end">
                                <button class=" ml-auto btn btn-success me-2">Completados</button>
                                <button class=" ml-auto btn btn-warning me-2">Pendientes</button>
                                <button class=" ml-auto btn btn-danger">Eliminar</button>
                            </td>
                        </tr>`; 

        
        tablaTareas.append(nuevaFila);
    }
}


agregar();
