import { Publicacion } from "../models/Publicacion.js";
import { Imagen } from "../models/Imagen.js";

import { Comentario } from "../models/Comentario.js";

import { Usuario } from "../models/Usuario.js";

import { Seguidor } from "../models/Seguidor.js";

import { Valoracion } from "../models/Valoracion.js"

import { MotivoDenuncia } from '../models/MotivoDenuncia.js'

import { fn, col, Op } from 'sequelize'


//USO PARA CUENTAS DERECHO EN LA BD
/*fn (Function): Se usa para llamar a funciones de SQL nativas como AVG (promedio), COUNT (contar), SUM (sumar), MIN, MAX, etc.
Ejemplo: fn('AVG', col('puntaje')) se traduce a SQL como AVG(puntaje).
col (Column): Se usa para decirle a Sequelize a qué columna específica de la base de datos debe aplicarle esa función.
*/




//req.session.usuario será undefined para invitados
export const mostrarHome=async(req, res)=>{
try{


const usuarioLogueado = req.session.usuario;
//voy a bd 
// con este includes consigo el comentario de cada imagen , usuarios y 


    const publicaciones1 = await Publicacion.findAll({
    where: {
     estado: { [Op.ne]: 'dada_de_baja' } // ← excluye las dadas de baja
     },


      include: [
        {
          model: Imagen,
          as: 'imagenes',
          include: [
            {
              model: Comentario,
              as: 'comentarios',
              include: [{ model: Usuario, as: 'usuario' }]
            },
            {
              //  trae todas las valoraciones de cada imagen
              model: Valoracion,
             as: 'valoraciones',
              attributes: ['puntaje', 'usuario_id']
            }
          ]
        },
        { model: Usuario, as: 'autor' }
      ],
      order: [['createdAt', 'DESC']] // publicaciones mas recientes primero
    });




// Convierte los objetos complejos de Sequelize en objetos de JS puros (planos). 
// Esto es fundamental para poder agregarles o modificarles propiedades después sin que Sequelize se queje.
    const publicaciones = publicaciones1.map(p => p.get({ plain: true }));

// Buscamos a quiénes sigue el usuario que está logueado actualmente
    let idsSeguidos = [];
    
    if (usuarioLogueado) {
      const misSeguidos = await Seguidor.findAll({
 // busco en la tabla del  seguidor que tiene el ID del logueado
       where: { seguidor_id: usuarioLogueado.id }
      });
      // Guardamos solo los IDs numéricos en un array simple: [2, 5, 8]
      idsSeguidos = misSeguidos.map(s => s.seguido_id);
    }

// Filtramos publicaciones privadas, si el usuariio cumple alguna de estas puede ver las publicaciones

const publicacionesFiltradas = publicaciones.filter(pub => {

  const esPublica = pub.imagenes[0]?.licencia !== 'copyright';
  const esMia = usuarioLogueado && pub.autor && String(pub.autor.id) === String(usuarioLogueado.id);
  const sigueAlAutor = pub.autor && idsSeguidos.includes(pub.autor.id);

  return esPublica || esMia || sigueAlAutor;
});




  
// pasamos de binario a texto formato base 64 

for(const publicacion of publicacionesFiltradas  ){


    for(const imagen of publicacion.imagenes || [] ){

// Dentro del for(const publicacion of publicaciones)
//console.log(`Publicación ID: ${publicacion.id} | Autor ID: ${publicacion.autor?.id} | Usuario Logueado ID: ${usuarioLogueado?.id}`);

        if (!imagen?.data) continue;

//La imagen guardada como bytes en la base de datos se transforma en un texto largo  para que el HTML pueda mostrarla
//  directamente en un <img src="">

    const imagenBase64=imagen.data.toString('base64');

    const sufijo=`data:image/${imagen.metadata};base64,`;

    imagen.src=sufijo+imagenBase64;


// Cálculos de valoraciones
//reduce, saca un promedio
const valoraciones = imagen.valoraciones || [];
imagen.cantidadValoraciones = valoraciones.length;
imagen.promedio = valoraciones.length
    ? (valoraciones.reduce((acc, v) => acc + v.puntaje, 0) / valoraciones.length).toFixed(1)
    : 0;

// Determinamos si el usuario ya votó
imagen.miVoto = usuarioLogueado
    ? (valoraciones.find(v => String(v.usuario_id) === String(usuarioLogueado.id))?.puntaje || null)
    : null;

// Lógica de permisos para votar
imagen.puedeVotar = usuarioLogueado 
    && publicacion.autor 
    && String(publicacion.autor.id) !== String(usuarioLogueado.id) 
    && !imagen.miVoto;







    }
    
   //  Evaluamos si el usuario actual sigue al autor de ESTA publicación
      // Si el id del autor esta en nuestra lista de seguidos, da true. Si no, false.
     

  if (publicacion.autor && usuarioLogueado) {
        publicacion.siguiendoAutor = idsSeguidos.includes(publicacion.autor.id); 
      } else {
        publicacion.siguiendoAutor = false;
      }
    }

/*

console.log('PRIMERA PUBLICACION');
console.log(
  publicaciones[0]?.imagenes?.map(img => ({
    id: img.id,
    puedeVotar: img.puedeVotar,
    miVoto: img.miVoto
  }))
);
*/

const motivos = await MotivoDenuncia.findAll({ raw: true });





res.render('home',{
     publicaciones: publicacionesFiltradas, 
    usuarioLogueado:req.session.usuario,
    query: req.query,
    motivos,
     origen: '/home'

});
   


}catch(error){
console.error(error)
return res.status(500).send("Error en home");

}
}
