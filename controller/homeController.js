import { Publicacion } from "../models/Publicacion.js";
import { Imagen } from "../models/Imagen.js";

import { Comentario } from "../models/Comentario.js";

import { Usuario } from "../models/Usuario.js";

export const mostrarHome=async(req, res)=>{

try{
 // VOY A BD TRAE PUBLICAC E IMAGENES   
const publicaciones1=await Publicacion.findAll({

//voy a bd 
// con este includes consigo el comentario de cada imagen , usuarios y 

include: [
  {
    model: Imagen,
    as: 'imagenes',

    include:[
      {
        model: Comentario,
        as: 'comentarios',

        include:[
          {
            model: Usuario,
             as: 'usuario'   
         }
              ]
            }
          ]
        },
      
    
  
  
  {
      model: Usuario,
      as: 'autor'
    }

  ],
  order: [
    ['createdAt', 'DESC'] // Ordeno por fecha de creación de la más nueva a la más vieja
  ]







});
  
//solucionando problemas
// Convertimos las instancias de Sequelize a objetos planos de JS
    const publicaciones = publicaciones1.map(p => p.get({ plain: true }));

  
// pasamos de binario a texto formato base 64 

for(const publicacion of publicaciones ){

    // ver
    for(const imagen of publicacion.imagenes || [] ){


        if (!imagen?.data) continue;

    const imagenBase64=imagen.data.toString('base64');

    const sufijo=`data:image/${imagen.metadata};base64,`;

    imagen.src=sufijo+imagenBase64;

    }


}




res.render('home',{
    publicaciones,
    usuario:req.session.usuario
});



}catch(error){
console.error(error)
return res.status(500).send("Error en home");

}
}