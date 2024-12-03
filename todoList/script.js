//Arrays para almacenar las tareas
let todas = [];
let completadas = [];
let pendientes = [];

//variables utilizadas
let input = $('#inputTarea');
let botonAñadir = $('#botonAñadir');
let formulario = $('#formulario');
let mensajeError = $('#error');
let tablaTareas = $('#tablaTareas');
let tablaCompletadas = $('#tablaCompletadas');
let tablaPendientes = $('#tablaPendientes');
let secciones = $('#secciones');

//contador para el id 
let contadorId = 0; 


//funcion de agregar
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

//funcion actualizar para que se vea los elemntos del array todas en la seccion de todas las tareas
function actualizarTablaTodas() {
    tablaTareas.empty();
    let encabezado = `
                <tr class="text-center">
                    <th colspan="2">Todas las Tareas</th>
                </tr>`;
        tablaTareas.append(encabezado);

    todas.forEach(function(tarea) {
        if (tarea.texto !== '') {
            let nuevaFila = `
                <tr data-id="${tarea.id}">
                    <td>${tarea.texto}</td>
                    <td class="d-flex justify-content-end">
                        <button class="ml-auto btn btn-success me-2 btnCompletar">Completar</button>
                        <button class="ml-auto btn btn-warning me-2 btnEditar">Editar</button>
                        <button class="ml-auto btn btn-danger btnEliminar">Eliminar</button>
                    </td>
                </tr>`;
            tablaTareas.append(nuevaFila);
        }
    });
}

//funcion para actualizar la tabla de completadas
function actualizarTablaCompletadas() {
    tablaCompletadas.empty();
    let encabezado = `
    <tr class="text-center">
        <th colspan="2">Tareas Completadas</th>
    </tr>`;
    tablaCompletadas.append(encabezado);

    completadas.forEach(function(tarea) {
        let nuevaFila = `
            <tr data-id="${tarea.id}">
                <td>${tarea.texto}</td>
                <td class="d-flex justify-content-end">
                    <button class="ml-auto btn btn-warning me-2 btnEditar">Editar</button>
                    <button class="ml-auto btn btn-danger btnEliminar">Eliminar</button>
                </td>
            </tr>`;
        tablaCompletadas.append(nuevaFila);
    });
}

//funcion para comletar una tarea en cualquier seccion
function completarTarea() {
    tablaTareas.on('click', '.btnCompletar', function(event) {
        event.preventDefault();
        let tareaId = $(this).closest('tr').data('id');

        let tareaCompletar = pendientes.find(tarea => tarea.id === tareaId);
        if (tareaCompletar) {
            completadas.push(tareaCompletar);
            pendientes = pendientes.filter(tarea => tarea.id !== tareaId);
            
            tareaCompletar.texto = `<del>${tareaCompletar.texto}</del>`

            actualizarTablaTodas();
            actualizarTablaCompletadas();
            actualizarTablaPendientes();
        }
    });

    tablaPendientes.on('click', '.btnCompletar', function(event) {
        event.preventDefault();
        let tareaId = $(this).closest('tr').data('id');

        let tareaCompletar = pendientes.find(tarea => tarea.id === tareaId);
        if (tareaCompletar) {
            completadas.push(tareaCompletar);
            pendientes = pendientes.filter(tarea => tarea.id !== tareaId);
            
            tareaCompletar.texto = `<del>${tareaCompletar.texto}</del>`

            actualizarTablaTodas();
            actualizarTablaCompletadas();
            actualizarTablaPendientes();
        }
    });
}

//funcion para actualizar la tabla de pendientes
function actualizarTablaPendientes() {
    tablaPendientes.empty();

    let encabezado = `
        <tr class="text-center">
            <th colspan="2">Tareas Pendientes</th>
        </tr>`;
    tablaPendientes.append(encabezado);
    pendientes.forEach(function(tarea) {
        if (tarea.texto !== '') {
            let nuevaFila = `
                <tr data-id="${tarea.id}">
                    <td>${tarea.texto}</td>
                    <td class="d-flex justify-content-end">
                        <button class="ml-auto btn btn-success me-2 btnCompletar">Completar</button>
                        <button class="ml-auto btn btn-warning me-2 btnEditar">Editar</button>
                        <button class="ml-auto btn btn-danger btnEliminar">Eliminar</button>
                    </td>
                </tr>`;
            tablaPendientes.append(nuevaFila);
        }
    });
}

//funcion para eliminar las tareas 
function eliminar() {
    function eliminarTarea(tareaId) {
        // Filtrar la tarea de todos los arrays
        todas = todas.filter(tarea => tarea.id !== tareaId);
        pendientes = pendientes.filter(tarea => tarea.id !== tareaId);
        completadas = completadas.filter(tarea => tarea.id !== tareaId);

        // Actualizar las tablas
        actualizarTablaTodas();
        actualizarTablaCompletadas();
        actualizarTablaPendientes();
    }

    // Vincular un único manejador de eventos al contenedor de las tablas
    [tablaTareas, tablaCompletadas, tablaPendientes].forEach(tabla => {
        tabla.on('click', '.btnEliminar', function(event) {
            event.preventDefault();
            let tareaId = $(this).closest('tr').data('id');
            eliminarTarea(tareaId);
        });
    });
}

//funcion para manejar las seccion y que se enseñen unas tablas y otras se escondan segun en que seccion esten 
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

//funcion de editar las tareas
function editar() {
    function editarTarea(tareaId) {
        
        let tareaEditar = todas.find(tarea => tarea.id === tareaId);

        if (tareaEditar) {
            
            let nuevoTexto = prompt("Editar tarea:", tareaEditar.texto);
            
            if (nuevoTexto && nuevoTexto.trim() !== "") {
                tareaEditar.texto = nuevoTexto.trim();
                
                pendientes.forEach(tarea => {
                    if (tarea.id === tareaId) tarea.texto = nuevoTexto.trim();
                });
                completadas.forEach(tarea => {
                    if (tarea.id === tareaId) tarea.texto = nuevoTexto.trim();
                });

                actualizarTablaTodas();
                actualizarTablaPendientes();
                actualizarTablaCompletadas();
            }
        } else {
            alert("No se pudo encontrar la tarea para editar.");
        }
    }

    
    [tablaTareas, tablaCompletadas, tablaPendientes].forEach(tabla => {
        tabla.on('click', '.btnEditar', function(event) {
            event.preventDefault();
            let tareaId = $(this).closest('tr').data('id');
            editarTarea(tareaId);
        });
    });
}

//Llamar a las funciones
editar();
eliminar();
agregar();
completarTarea();
manejoSecciones();

