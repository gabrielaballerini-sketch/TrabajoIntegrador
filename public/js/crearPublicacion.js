

//selecciono del dom

//aca es donde se guardan las fotoss

console.log('JS cargado');
console.log("acaaaaaaaaaa")


const fileInput = document.getElementById('img');

console.log(fileInput);
const contenedorPreviews = document.getElementById('imgsPreview');

///VER SI SACO ESTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

// Validamos que existan en la página actual antes de HACER  el evento
if (fileInput && contenedorPreviews) {
  console.log("Formulario de creación detectado. Activando previews...");



fileInput.addEventListener('change', (e) => {


// limpiamos lo anterior

  contenedorPreviews.innerHTML = '';

//recorremos cada archivo 

  for(const file of e.target.files){


    //crea una url temporal
    const url = URL.createObjectURL(file);



// creamos la imagen previa
    createImgPreview(url);

  }

});
}

//para ver la vista previa ..todo lo qhay q hacer
function createImgPreview(src) {


  // Creooo una columna 
  const col = document.createElement('div');
  col.classList.add('col-4'); // 3 imágenes por fila

  const img = document.createElement('img');
  img.src = src;
  img.classList.add('img-fluid', 'rounded'); // bbootstrap para que sea responsive
  img.style.height = '150px';
  img.style.objectFit = 'cover';

  col.appendChild(img);
  contenedorPreviews.appendChild(col);
}