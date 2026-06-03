

document.querySelectorAll('.miniatura').forEach((mini)=>{

  mini.addEventListener('click', ()=>{

/*
 buscando errores.. 
  console.log('ID imagen:', mini.dataset.id);
  console.log('Promedio:', mini.dataset.promedio);
  console.log('Cantidad:', mini.dataset.cantidad);
  console.log('Puede votar:', mini.dataset.puedevotar);
  console.log('Mi voto:', mini.dataset.mivoto);
 console.log({
    imagen: mini.dataset.id,
    puedeVotar: mini.dataset.puedevotar,
    miVoto: mini.dataset.mivoto
  });


  */


    const card = mini.closest('.card');

    /*

console.log("Imagen:", mini.dataset.id);
console.log("puedeVotar:", mini.dataset.puedevotar);
console.log("miVoto:", mini.dataset.mivoto);
*/



// Cambiamos la imagen principal de la tarjeta actual
    const principal = card.querySelector('.imagenPrincipal');
    if (principal) {
      principal.src = mini.src;
    }

const promedio = card.querySelector('.promedioValoracion');
const cantidad = card.querySelector('.cantidadValoraciones');

const valoracionContainer =  card.querySelector('.valoracionContainer');





if (promedio) {
  promedio.textContent = mini.dataset.promedio || 0;
}

if (cantidad) {
  cantidad.textContent = mini.dataset.cantidad || 0;
}





// Cambiar action del form
const form = card.querySelector('.formComentario');



if (valoracionContainer) {

  if (mini.dataset.mivoto) {

    const voto = Number(mini.dataset.mivoto);

    let estrellas = '';

    for (let i = 1; i <= 5; i++) {
      estrellas += i <= voto ? '★' : '☆';
    }

    valoracionContainer.innerHTML = `
      <span style="color:#FFD700;font-size:1.2rem;">
        ${estrellas}
      </span>
      <small class="ms-2">¡Ya votaste!</small>
    `;

  } else if (mini.dataset.puedevotar === 'true') {

    valoracionContainer.innerHTML = `
      <form class="formValoracion d-flex align-items-center gap-1"
            action="/valoraciones/imagenes/${mini.dataset.id}/valorar"
            method="POST">

        <button class="btn btn-link p-0 border-0"
                type="submit"
                name="puntaje"
                value="1">★</button>

        <button class="btn btn-link p-0 border-0"
                type="submit"
                name="puntaje"
                value="2">★</button>

        <button class="btn btn-link p-0 border-0"
                type="submit"
                name="puntaje"
                value="3">★</button>

        <button class="btn btn-link p-0 border-0"
                type="submit"
                name="puntaje"
                value="4">★</button>

        <button class="btn btn-link p-0 border-0"
                type="submit"
                name="puntaje"
                value="5">★</button>

      </form>
    `;

  } else {

    valoracionContainer.innerHTML =
      '<p class="text-muted small">No puedes valorar tu propia publicación.</p>';
  }
}





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
          <strong>${comen.usuario?.nombre ?? 'Usuario'}: </strong>
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





