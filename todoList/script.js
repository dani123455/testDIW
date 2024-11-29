let todas = [];
let completadas = [];
let pendientes = [];

let input = $('#inputTarea');
let botonAñadir = $('#botonAñadir');
let formulario = $('#formulario');
let mensajeError = $('#error');
let tablaTareas = $('#tablaTareas');
let tablaCompletadas = $('#tablaCompletadas'); 
let secciones = $('.secciones'); 

function agregar() {
    formulario.on('submit', function(event) {
        event.preventDefault(); 

        if (input.val().trim() === '') { 
            mensajeError.removeClass('d-none');  
        } else {
            mensajeError.addClass('d-none');
            let tareaTexto = input.val().trim(); 
            todas.push(tareaTexto); 
            pendientes.push(tareaTexto);
            input.val(''); 
            actualizarTablaTodas();
        }
    });
}

function actualizarTablaTodas() {
    tablaTareas.empty(); 
    todas.forEach(function(tareaTexto) {
        if (tareaTexto !== '') {
            let nuevaFila = `<tr>
                                <td>${tareaTexto}</td>
                                <td class="d-flex justify-content-end">
                                    <button class="ml-auto btn btn-success me-2 btnCompletar">Completados</button>
                                    <button class="ml-auto btn btn-warning me-2">Editar</button>
                                    <button class="ml-auto btn btn-danger btnEliminar">Eliminar</button>
                                </td>
                            </tr>`; 
            tablaTareas.append(nuevaFila);
        }
    });
}

function actualizarTablaCompletadas() {
    tablaCompletadas.empty(); 
    completadas.forEach(function(tareaCompletada) {
        if (tareaCompletada !== '') {
            let nuevaFila = `<tr>
                                <td>${tareaCompletada}</td>
                                <td class="d-flex justify-content-end">
                                    <button class="ml-auto btn btn-warning me-2">Editar</button>
                                    <button class="ml-auto btn btn-danger btnEliminar">Eliminar</button>
                                </td>
                            </tr>`; 
            tablaCompletadas.append(nuevaFila);
        }
    });
}

function completarTarea() {
    tablaTareas.on('click', '.btnCompletar', function(event) {
        event.preventDefault();
        let tareaTexto = $(this).closest('tr').find('td:first').text(); 
        completadas.push(tareaTexto);
        pendientes = pendientes.filter(tarea => tarea !== tareaTexto); 
        todas = todas.filter(tarea => tarea !== tareaTexto); 
        actualizarTablaTodas(); 
        actualizarTablaCompletadas(); 
    });
}

function eliminar() {
    tablaTareas.on('click', '.btnEliminar', function(event) {
        event.preventDefault();
        let tareaTexto = $(this).closest('tr').remove();
        actualizarTablaTodas();
    });

    tablaCompletadas.on('click', '.btnEliminar', function(event) {
        event.preventDefault();
        let tareaTexto = $(this).closest('tr').remove(); 
        actualizarTablaCompletadas(); 
    });
}

eliminar();
agregar();
completarTarea();


//arreglar elminar dar funcion a la seccion de completadas con otra tabla escondida