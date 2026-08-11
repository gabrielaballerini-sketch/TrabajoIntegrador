


//querySelectorAll('.miniatura'): Busca todas las fotos pequeñas de la página.


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


//mini.closest('.card'):  Sube por el árbol HTML hasta encontrar el contenedor <div class="card"> de esa publicación en particular. 
//Así se asegura de modificar solo la tarjeta correcta y no tocar las de otros posteos.


    const card = mini.closest('.card');

    /*

console.log("Imagen:", mini.dataset.id);
console.log("puedeVotar:", mini.dataset.puedevotar);
console.log("miVoto:", mini.dataset.mivoto);
*/



// Cambia la foto principal: Copia la URL de la miniatura cliqueada (mini.src) y se la pone a la imagen grande (principal.src).
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
  // CASO A: El usuario ya votó esta imagen en particular

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
// CASO B: El usuario no votó y TIENE permiso (no es autor, está logueado)
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
// CASO C: No puede votar (es su propia publicación o es invitado)
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

  









