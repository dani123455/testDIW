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

let contadorId = 0; 

function agregar() {
    formulario.on('submit', function(event) {
        event.preventDefault();

        if (input.val().trim() === '') {
            mensajeError.removeClass('d-none');
        } else {
            mensajeError.addClass('d-none');
            let tareaTexto = input.val().trim();
            contadorId++;
            let nuevaTarea = { id: contadorId, texto: tareaTexto };
            todas.push(nuevaTarea);
            pendientes.push(nuevaTarea);
            input.val('');
            actualizarTablaTodas();
            actualizarTablaPendientes();
        }
    });
}

function actualizarTablaTodas() {
    tablaTareas.empty();
    todas.forEach(function(tarea) {
        if (tarea.texto !== '') {
            let nuevaFila = `
                <tr data-id="${tarea.id}">
                    <td>${tarea.texto}</td>
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
    completadas.forEach(function(tarea) {
        let nuevaFila = `
            <tr data-id="${tarea.id}">
                <td>${tarea.texto}</td>
                <td class="d-flex justify-content-end">
                    <button class="ml-auto btn btn-warning me-2">Editar</button>
                    <button class="ml-auto btn btn-danger btnEliminar">Eliminar</button>
                </td>
            </tr>`;
        tablaCompletadas.append(nuevaFila);
    });
}

function completarTarea() {
    tablaTareas.on('click', '.btnCompletar', function(event) {
        event.preventDefault();
        let tareaId = $(this).closest('tr').data('id');

        let tareaCompletar = pendientes.find(tarea => tarea.id === tareaId);
        if (tareaCompletar) {
            completadas.push(tareaCompletar);
            pendientes = pendientes.filter(tarea => tarea.id !== tareaId);
            
            actualizarTablaTodas();
            actualizarTablaCompletadas();
            actualizarTablaPendientes();
        }
    });
}

function actualizarTablaPendientes() {
    tablaPendientes.empty();
    pendientes.forEach(function(tarea) {
        if (tarea.texto !== '') {
            let nuevaFila = `
                <tr data-id="${tarea.id}">
                    <td>${tarea.texto}</td>
                    <td class="d-flex justify-content-end">
                        <button class="ml-auto btn btn-success me-2 btnCompletar">Completar</button>
                        <button class="ml-auto btn btn-warning me-2">Editar</button>
                        <button class="ml-auto btn btn-danger btnEliminar">Eliminar</button>
                    </td>
                </tr>`;
            tablaPendientes.append(nuevaFila);
        }
    });
}





function eliminar() {
    tablaTareas.on('click', '.btnEliminar', function(event) {
        event.preventDefault();
        let tareaId = $(this).closest('tr').data('id');
        
        todas = todas.filter(tarea => tarea.id !== tareaId);
        pendientes = pendientes.filter(tarea => tarea.id !== tareaId);
        completadas = completadas.filter(tarea => tarea.id !== tareaId);
        
        actualizarTablaTodas();
        actualizarTablaCompletadas();
    });

    tablaCompletadas.on('click', '.btnEliminar', function(event) {
        event.preventDefault();
        let tareaId = $(this).closest('tr').data('id');
        
        todas = todas.filter(tarea => tarea.id !== tareaId);
        pendientes = pendientes.filter(tarea => tarea.id !== tareaId);
        completadas = completadas.filter(tarea => tarea.id !== tareaId);
        
        actualizarTablaTodas();
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

//Poner el tachado solucionar lo que se duplica y hacer ek editar