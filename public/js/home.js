

document.querySelectorAll('.miniatura').forEach((mini)=>{




  mini.addEventListener('click', ()=>{



    const card = mini.closest('.card');



    const principal = card.querySelector('.imagenPrincipal');



    principal.src = mini.src;

  });

});