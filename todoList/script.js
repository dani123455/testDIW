let todas = [];
let completadas = [];
let pendientes = [];

let input = $('#inputTarea');
let botonAñadir = $('#botonAñadir');
let formulario = $('#formulario');
let mensajeError = $('#error');
let tablaTareas = $('#tablaTareas');
let tablaCompletadas = $('#tablaCompletadas');
let tablaPendientes = $('#tablaPendientes');
let secciones = $('#secciones');

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
            let nuevaFila = `
                <tr>
                    <td>${tareaTexto}</td>
                    <td class="d-flex justify-content-end">
                        <button class="ml-auto btn btn-success me-2 btnCompletar">Completar</button>
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
    if(tablaCompletadas.on('click','.btnSeccionCompletar', function(event){
        event.preventDefault();
        completadas.forEach(function(tareaCompletada) {
            let nuevaFila = `
                <tr>
                    <td>${tareaCompletada}</td>
                    <td class="d-flex justify-content-end">
                        <button class="ml-auto btn btn-warning me-2">Editar</button>
                        <button class="ml-auto btn btn-danger btnEliminar">Eliminar</button>
                    </td>
                </tr>`;
            tablaCompletadas.append(nuevaFila);
        });
    }));

}

function completarTarea() {
    tablaTareas.on('click', '.btnCompletar', function(event) {
        event.preventDefault();
        let tareaTexto = $(this).closest('tr').find('td:first').text();
        
        if (!completadas.includes(tareaTexto)) {
            completadas.push(tareaTexto);
            pendientes = pendientes.filter(tarea => tarea !== tareaTexto);
            actualizarTablaTodas();
            actualizarTablaCompletadas();
        }
    });
}

function eliminar() {
    tablaTareas.on('click', '.btnEliminar', function(event) {
        event.preventDefault();
        let tareaTexto = $(this).closest('tr').find('td:first').text();
        todas = todas.filter(tarea => tarea !== tareaTexto);
        pendientes = pendientes.filter(tarea => tarea !== tareaTexto);
        actualizarTablaTodas();
    });

    tablaCompletadas.on('click', '.btnEliminar', function(event) {
        event.preventDefault();
        let tareaTexto = $(this).closest('tr').find('td:first').text();
        completadas = completadas.filter(tarea => tarea !== tareaTexto);
        actualizarTablaCompletadas();
    });
}

function manejoSecciones() {
    secciones.on('click', 'button', function() {
        tablaTareas.hide();
        tablaCompletadas.hide();
        tablaPendientes.hide();

        if ($(this).hasClass('btnSeccionTodas')) {
            tablaTareas.show();
        } else if ($(this).hasClass('btnSeccionCompletar')) {
            tablaCompletadas.show();
        } else if ($(this).hasClass('btnSeccionPendientes')) {
            tablaPendientes.show();
        }
    });
}


eliminar();
agregar();
completarTarea();
manejoSecciones();

//HACER QUE SE VEA LAS TAREAS EN COMPLETADO Y PENDIENTES 