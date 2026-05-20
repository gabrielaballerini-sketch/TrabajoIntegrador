const fileInput = document.getElementById('img');

const errores = document.getElementById('errores');
const contenedorImgs = document.getElementById('imgsBase64');
const contenedorPreviews = document.getElementById('imgsPreview');

const form = document.forms[0];

const arregloImgs = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bodyToSend = {

  titulo:form.titulo.value,
  descripcion:form.descripcion.value,

    imgs: arregloImgs,
    fecha: new Date().toLocaleTimeString()
  }
  fetch(form.action, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyToSend)
  })
  .then((response)=>response.json())
  .then((data)=>{
  console.log(data);

  window.location='/home'

  })


})

fileInput.addEventListener('change', (e) => {

  const file = e.target.files[0];
  console.log(e.target.files);

  for(let i=0; i<e.target.files.length; i++){
    const file = e.target.files[i]
    const resultado = validarFile(file);
    if(!resultado){
      const li = document.createElement('li');
      li.innerText = `Error imagen ${file.name}`;
      errores.appendChild(li)
      continue;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const imagen = {
        src: reader.result,
        name: file.name
      }

      arregloImgs.push(imagen)

      // const textArea = document.createElement('textarea');
      // textArea.hidden = true;
      // textArea.value = reader.result;
      // textArea.name = `imgsBase64-${i}`
      // contenedorImgs.appendChild(textArea);

      createImgPreview(reader.result);   
    };
    reader.readAsDataURL(file);
  }
});

function createImgPreview(value) {
  const imgPreview = document.createElement('img');
  imgPreview.src = value;
  imgPreview.style.width = '300px';
  contenedorPreviews.appendChild(imgPreview);  
}

function validarFile(file) {
  if (!file) return false;

  if(file.size > 1000000){
    console.error('No podes subir mas de 1mb')
    return false;
  }

  return true;
}