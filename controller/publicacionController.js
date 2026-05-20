import {Publicacion} from '../models/Publicacion.js'
import{Imagen} from '../models/Imagen.js'


//voy al formu
export const mostrarFormulario=(req,res)=>{

res.render('publicaciones/vistaCrearPublicaciones');



};


//submit
export const crearPublicacion=async (req,res)=>{

try{

    console.log(req.body)
   
    const{
    titulo,
    descripcion,
    imgs

    }=req.body
    
    



    
// registro bd
const publicacion=await Publicacion.create({

    titulo,
    descripcion,
    usuario_id:1
 

});

for(const img of imgs){

  const textBase64 = img.src;

  // separa metadata y contenido
  const arregloBase64 = textBase64.split(',');

  // obtiene jpg/png/jpeg
  const extension = arregloBase64[0]
    .split('/')[1]
    .split(';')[0];

  // convierte base64 -> buffer binario
  const imgBuffer = Buffer.from(
    arregloBase64[1],
    'base64'
  );

  console.log(extension);

  await Imagen.create({

    data: imgBuffer,

    metadata: extension,

    publicacion_id: publicacion.id

  });

}



res.json({
  ok:true

});
}catch(error){

console.log(error)

res.status(500).json({
error:'error'

})

}

}