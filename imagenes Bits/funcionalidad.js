
const listaImagenes = document.getElementById('listaImagenes');
const numFilasSelect = document.getElementById('numFilas');

function generarImagenes(numFilas) {
    listaImagenes.innerHTML = ''; 
    for (let i = 1; i <= numFilas; i++) { 
        const idImagen = i; 
        const elementoImagen = document.createElement('div');
        elementoImagen.className = 'col-md-3 text-center mb-4'; 
        elementoImagen.innerHTML = `
            <img 
                src="https://picsum.photos/id/${idImagen}/150/150" 
                alt="Imagen ${idImagen}" 
                loading="lazy" 
                class="imagen-redondeada"
            >
            <p>ID:${idImagen}  Descripción Foto ${idImagen}</p>
        `;
        listaImagenes.appendChild(elementoImagen);
    }
}

numFilasSelect.addEventListener('change', function() {
    const numFilas = parseInt(this.value);
    generarImagenes(numFilas);
});

generarImagenes(parseInt(numFilasSelect.value));