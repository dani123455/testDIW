let todas =[];
let completadas = [];
let pendientes = [];


formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const tarea = input.value.trim();

if (tarea!=null){
        // Agregar nueva tarea
        const nuevaTarea = {
            id: Date.now(),
            tarea
        };
        tarea.push(nuevaTarea);
    }
});

function actualizarTabla() {
    tablaTareas.innerHTML = '';
    tareas.forEach(tarea => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.input}</td>
            <td class="text-center">
                <button class="btn btn-primary btn-sm me-4" onclick="editarTarea(${tarea.id})"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${tarea.id})"><i class="bi bi-trash3"></i></button>
            </td>
        `;
        tablaTareas.appendChild(fila);
    });
}