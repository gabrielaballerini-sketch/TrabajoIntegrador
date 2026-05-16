import { Publicacion } from "../models/Publicacion.js";
import { Imagen } from "../models/Imagen.js";

export const mostrarHome=async(req, res)=>{


 // VOY A BD TRAE PUBLICAC E IMAGENES   
const publicaciones=await Publicacion.findAll({
include:Imagen


})


// CON LA INFO Q MANDO RENDERIZO
// CON LA INFO Q MANDO RENDERIZO
console.log(JSON.stringify(publicaciones,null,2))

res.render('home',{

publicaciones

});

}