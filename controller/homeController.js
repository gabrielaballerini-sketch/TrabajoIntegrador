import { Publicacion } from "../models/Publicacion.js";
import { Imagen } from "../models/Imagen.js";

export const mostrarHome=async(req, res)=>{

try{
 // VOY A BD TRAE PUBLICAC E IMAGENES   
const publicaciones=await Publicacion.findAll({
include:Imagen

})


for(const publicacion of publicaciones ){

    // ver
    for(const imagen of publicacion.Imagens){

    const imagenBase64=imagen.data.toString('base64');

    const sufijo=`data:image/${imagen.metadata};base64,`;

    imagen.src=sufijo+imagenBase64;

    }


}



// CON LA INFO Q MANDO RENDERIZO
// CON LA INFO Q MANDO RENDERIZO
console.log(JSON.stringify(publicaciones,null,2))

res.render('home',{

publicaciones

});


}catch(error){
console.error(error)


}
}