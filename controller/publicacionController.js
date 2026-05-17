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

  await Imagen.create({  
  data:img.src,
  publicacion_id:publicacion.id
  })

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