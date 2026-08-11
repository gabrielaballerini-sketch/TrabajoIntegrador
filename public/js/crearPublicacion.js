

//selecciono del dom

//aca es donde se guardan las fotoss

//console.log('JS cargado');
//console.log("acaaaaaaaaaa")


const fileInput = document.getElementById('img');

//console.log(fileInput);
const contenedorPreviews = document.getElementById('imgsPreview');



// Validamos que existan en la página actual antes de HACER  el evento
if (fileInput && contenedorPreviews) {
  console.log("Formulario de creación detectado. Activando previews...");



fileInput.addEventListener('change', (e) => {


// limpiamos lo anterior

  contenedorPreviews.innerHTML = '';

  // e.target.files: Contiene la lista de archivos reales que el usuario acaba de 
  // seleccionar de su disco rígido
//recorremos cada archivo 

  for(const file of e.target.files){

    // Saltamos archivos que no sean imágenes
    if (!file.type.startsWith('image/')) continue;

    //crea una url temporal en la memoria RAM del navegador .. Permite que el navegador pueda mostrar la foto en pantalla de inmediato sin necesidad de haberla 
    // subido todavía al servidor backend.
    const url = URL.createObjectURL(file);

 const col = document.createElement('div');
 col.classList.add('col-4'); // 3 imágenes por fila

const img = document.createElement('img');
      img.src = url;
      img.classList.add('img-fluid', 'rounded');
      img.style.height = '150px';
      img.style.objectFit = 'cover';

      // Libera la memoria RAM una vez que la imagen ya cargó
      img.onload = () => URL.revokeObjectURL(url);

      col.appendChild(img);
      contenedorPreviews.appendChild(col);

  }

});
}


