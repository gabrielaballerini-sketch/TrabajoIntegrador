import { Publicacion } from "../models/Publicacion.js";
import { Imagen } from "../models/Imagen.js";

export const mostrarPerfil=async(req, res)=>{


try{
if(!req.session.usuario){

return res.redirect('/auth/login')

}

 // VOY A BD TRAE PUBLICAC E IMAGENES   

 //eligo mi usuario

 const usuario=req.session.usuario;


const publicaciones = await Publicacion.findAll({
  where: {
    usuario_id: usuario.id
  },
  include: [
    {
      model: Imagen,
      as: 'imagenes'
    }
  ]
});

for(const publicacion of publicaciones ){

    // ver
    for(const imagen of publicacion.imagenes){

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