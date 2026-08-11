
import { Seguidor } from "../models/Seguidor.js";

import { Usuario } from "../models/Usuario.js";

import { Publicacion } from "../models/Publicacion.js";
import { Imagen } from "../models/Imagen.js";

import { Comentario } from "../models/Comentario.js";

import { Valoracion } from "../models/Valoracion.js";

import { MotivoDenuncia } from '../models/MotivoDenuncia.js';

export const seguirUsuario = async (req,res)=>{

try{

  const seguidorId = req.session.usuario.id;

  const seguidoId = req.params.id;

  //parseo x seguridad nomas
  //  Evitamos que un usuario se siga a sí mismo por error (por las dudas)
if (parseInt(seguidorId, 10) === parseInt(seguidoId, 10)) {
    
  
  return res.redirect(`/usuarios/${seguidoId}`);
    }


 //findOrCreate busca si ya existe. Si existe, no hace un doble INSERT.
  await Seguidor.findOrCreate({
    where:{
      seguidor_id: seguidorId,
      seguido_id: seguidoId
    }
  });

  //pasaba al perfil antes
 // res.redirect(`/usuarios/${seguidoId}`);

 res.redirect(`/home`); 

}catch(error){
console.error(error);
res.status(500).send('Error al seguir')

}
}



export const dejarDeSeguir = async (req, res) => {
  try {

    const seguidoId = req.params.id;
    const seguidorId = req.session.usuario.id; 
    
    await Seguidor.destroy({
      where: { seguidor_id: seguidorId, seguido_id: seguidoId }
    })


    //res.redirect(`/usuarios/${seguidoId}`);
     res.redirect(`/home`); 
  
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al dejar de seguir');
  }
};


export const verSeguidores = async (req,res)=>{

try{

    const usuarioId = req.session.usuario.id;

    const usuario = await Usuario.findByPk(usuarioId,{
        include:[
            {
                model: Usuario,
                as:'seguidores',
                through:{ attributes:[] }
            }
        ]
    });

    res.render('seguidorSeguidos',{
        usuarios: usuario.seguidores,
        titulo:'Mis seguidores'
    });

}catch(error){

    console.error(error);
    res.status(500).send('Error al cargar seguidores');

}

}

export const verSeguidos = async (req,res)=>{

try{

    const usuarioId = req.session.usuario.id;

    const usuario = await Usuario.findByPk(usuarioId,{
        include:[
            {
                model: Usuario,
                as:'seguidos',
                through:{ attributes:[] }
            }
        ]
    });

    res.render('seguidorSeguidos',{
        usuarios: usuario.seguidos,
        titulo:'Usuarios que sigo'
    });

}catch(error){

    console.error(error);
    res.status(500).send('Error al cargar seguidos');

}

}



export const publicacionesDeSeguidos = async (req, res) => {
  try {
    const usuarioLogueado = req.session.usuario;

    // Traigo los IDs de usuarios que sigo
    const misSeguidos = await Seguidor.findAll({
      where: { seguidor_id: usuarioLogueado.id }
    });
    const idsSeguidos = misSeguidos.map(s => s.seguido_id);

    if (idsSeguidos.length === 0) {
      return res.render('publicacionesDeSeguidos', {
        publicaciones: [],
        usuarioLogueado,
        cantidadSeguidores: req.cantidadSeguidores,
        cantidadSiguiendo: req.cantidadSiguiendo
      });
    }

    const publicaciones1 = await Publicacion.findAll({
      where: { usuario_id: idsSeguidos },
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
              model: Valoracion,
              as: 'valoraciones',
              attributes: ['puntaje', 'usuario_id']
            }
          ]
        },
        { model: Usuario, as: 'autor' }
      ],
      order: [['createdAt', 'DESC']]
    });

    const publicaciones = publicaciones1.map(p => p.get({ plain: true }));

    // Reutilizás el mismo procesamiento de imágenes que en home
    for (const publicacion of publicaciones) {
      for (const imagen of publicacion.imagenes || []) {
        if (!imagen?.data) continue;

        imagen.src = `data:image/${imagen.metadata};base64,` + imagen.data.toString('base64');

        const valoraciones = imagen.valoraciones || [];
        imagen.cantidadValoraciones = valoraciones.length;
        imagen.promedio = valoraciones.length
          ? (valoraciones.reduce((acc, v) => acc + v.puntaje, 0) / valoraciones.length).toFixed(1)
          : 0;
        imagen.miVoto = valoraciones.find(v => String(v.usuario_id) === String(usuarioLogueado.id))?.puntaje || null;
        imagen.puedeVotar = String(publicacion.autor.id) !== String(usuarioLogueado.id) && !imagen.miVoto;
      }
      publicacion.siguiendoAutor = true; // si aparece acá, ya lo seguís
    }

    res.render('publicacionesDeSeguidos', {
      publicaciones,
      usuarioLogueado,
      motivos,
      cantidadSeguidores: req.cantidadSeguidores,
      cantidadSiguiendo: req.cantidadSiguiendo
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar publicaciones de seguidos');
  }
};