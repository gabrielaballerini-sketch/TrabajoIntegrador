import { Publicacion } from "../models/Publicacion.js";
import { Imagen } from "../models/Imagen.js";

export const mostrarHome=async(req, res)=>{

try{
 // VOY A BD TRAE PUBLICAC E IMAGENES   
const publicaciones=await Publicacion.findAll({


include: [
        {
          model: Imagen,
          as: 'imagenes'}
                  ]
            });





// MODIFFFF

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