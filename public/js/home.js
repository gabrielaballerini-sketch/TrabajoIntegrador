

document.querySelectorAll('.miniatura').forEach((mini)=>{




  mini.addEventListener('click', ()=>{




    const card = mini.closest('.card');

  
    console.log('card encontrada:', card);


  // Cambiar imagen principal
    const principal = card.querySelector('.imagenPrincipal');



    principal.src = mini.src;

     // Cambiar action del form
  const form = card.querySelector('.formComentario');

   console.log('form encontrado:', form);
    console.log('data-id de la miniatura:', mini.dataset.id);
  

  form.action = `/comentarios/${mini.dataset.id}`;

    // Actualizar comentarios visibles
    const contenedor = card.querySelector('.comentariosContainer');
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



  });

})



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









