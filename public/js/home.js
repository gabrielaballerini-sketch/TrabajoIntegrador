

document.querySelectorAll('.miniatura').forEach((mini)=>{

  mini.addEventListener('click', ()=>{

    const card = mini.closest('.card');

// Cambiamos la imagen principal de la tarjeta actual
    const principal = card.querySelector('.imagenPrincipal');
    if (principal) {
      principal.src = mini.src;
    }
// Cambiar action del form
const form = card.querySelector('.formComentario');
    if (form) {
      form.action = `/comentarios/${mini.dataset.id}`;
    }

  

// 3. Actualizar comentarios visibles en base al data-comentarios de la miniatura
    const contenedor = card.querySelector('.comentariosContainer');

    if (contenedor) {
    const comentarios = JSON.parse(mini.dataset.comentarios || '[]');

    if (comentarios.length === 0) {
      contenedor.innerHTML = '<p class="text-muted">No hay comentarios</p>';
    } else {
      contenedor.innerHTML = comentarios.map(comen => `
        <div class="mb-2">
          <strong>${comen.nombre}: </strong>
          <span>${comen.contenido}</span>
        </div>
      `).join('');
    }
  }
  });
});



//Lo que hace: al cargar /home?imagenActiva=id que sea,
//  busca la miniatura con data-id="id que seaaaa",
//  le hace click automático 
// ahi  actualiza imagen, comentarios y form  y hace scroll hasta ella.



const params = new URLSearchParams(window.location.search);
const imagenActiva = params.get('imagenActiva');

if (imagenActiva) {
  const miniActiva = document.querySelector(`.miniatura[data-id="${imagenActiva}"]`);
    
  
  if (miniActiva) {
    miniActiva.click();
    miniActiva.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

  



//Lo que hace: al cargar /home?imagenActiva=id que sea,
//  busca la miniatura con data-id="id que seaaaa",
//  le hace click automático 
// ahi  actualiza imagen, comentarios y form  y hace scroll hasta ella.


  
//  window.onload espera a que cargue la pagina..cuando esta cargada hace
window.onload = function() {
  const fileInput = document.getElementById('img');
  const contenedorPreviews = document.getElementById('imgsPreview');

  // Solo si encontrás el input en esta pantalla, activá el código
  if (fileInput && contenedorPreviews) {
    console.log("Lector de imágenes activo y seguro.");

    fileInput.addEventListener('change', (e) => {
      contenedorPreviews.innerHTML = ''; // Limpia las miniaturas anteriores
      
      const archivos = e.target.files;
      if (!archivos) return;

      Array.from(archivos).forEach(file => {
        if (file.type.startsWith('image/')) {

          const urlTemporal = URL.createObjectURL(file);

          const col = document.createElement('div');
          col.classList.add('col-4'); 

          const img = document.createElement('img');
          img.src = urlTemporal;
          img.classList.add('img-fluid', 'rounded'); 

          img.style.height = '150px';

          img.style.objectFit = 'cover';

          // Limpieza de memoria para que la app sea liviana
          img.onload = () => { URL.revokeObjectURL(urlTemporal); };

          col.appendChild(img);
          contenedorPreviews.appendChild(col);
        }
      });
    });
  }
};





