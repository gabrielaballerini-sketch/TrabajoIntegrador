import { Publicacion } from "../models/Publicacion.js";
import { Imagen } from "../models/Imagen.js";

import { Comentario } from "../models/Comentario.js";

import { Usuario } from "../models/Usuario.js";

export const mostrarPerfil=async(req, res)=>{


try{
if(!req.session.usuario){

return res.redirect('/auth/login')

}

 // VOY A BD TRAE PUBLICAC E IMAGENES   

 //eligo mi usuario

 const usuario=req.session.usuario;


 const publicaciones1 = await Publicacion.findAll({
      where: { usuario_id: usuario.id },
      include: [
        {

          model: Imagen,

          as: 'imagenes',

          include: [
            {


              model: Comentario,

              as: 'comentarios',
              include: [{ model: Usuario, as: 'usuario' }]
            }
            ]

          }
        ]
    });


//  Convertimos a objetos planos de JS para poder mutar los datos
    const publicaciones = publicaciones1.map(p => p.get({ plain: true }));


    // de binario a base 64
for(const publicacion of publicaciones ){

 
    for(const imagen of publicacion.imagenes|| []){
 
    if (!imagen?.data) continue;

    const imagenBase64=imagen.data.toString('base64');

    const sufijo=`data:image/${imagen.metadata};base64,`;

    imagen.src=sufijo+imagenBase64;

    }


}







res.render('perfil',{
    usuario,
    publicaciones,
   
});



}catch(error){

    console.error("ERROR PERFIL:", error);
    return res.status(500).send("Error en perfil");




}
}