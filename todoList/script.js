let todas = [];
let completadas = [];
let pendientes = [];

let input = $('#inputTarea');
let botonAñadir = $('#botonAñadir');
let formulario = $('#formulario');
let mensajeError = $('#error');
let tablaTareas = $('#tablaTareas');
let tareaTexto = tarea.val().trim(); 

const tarea = $('#inputTarea');

function agregar() {
    formulario.on('submit', function(event) {
        event.preventDefault(); 

        if (tarea.val().trim() === '') { 
            mensajeError.removeClass('d-none');  
        } else {
            mensajeError.addClass('d-none');
            todas.push(tareaTexto); 
            pendientes.push(tareaTexto);
            input.val(''); 
            actualizarTabla(tareaTexto);
        }
    });
}

function actualizarTablaTodasPendientes(tareaTexto) {
    if (tareaTexto !== '') {
        let nuevaFila = `<tr>
                            <td>${tareaTexto}</td>
                            <td class="d-flex justify-content-end">
                                <button class="ml-auto btn btn-success me-2">Completados</button>
                                <button class="ml-auto btn btn-warning me-2">Editar</button>
                                <button class="ml-auto btn btn-danger btnEliminar">Eliminar</button>
                            </td>
                        </tr>`; 

        tablaTareas.append(nuevaFila);
    }
}



function eliminar() {
    tablaTareas.on('click', '.btnEliminar', function(event) {
        event.preventDefault();
        $(this).closest('tr').remove(); 
    });
}

eliminar();
agregar();


//Para lo de completar y demas recorrer el array de pendientes y todas y ponerla en la tabla y despues hacer
//otra tabla para completadas. Hacer magia