
import { Seguidor } from "../models/Seguidor.js";

import { Usuario } from "../models/Usuario.js";

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

 res.redirect(`/usuarios/${seguidoId}`);

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


    res.redirect(`/usuarios/${seguidoId}`);
  
  
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

    res.render('seguidores',{
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

    res.render('seguidores',{
        usuarios: usuario.seguidos,
        titulo:'Usuarios que sigo'
    });

}catch(error){

    console.error(error);
    res.status(500).send('Error al cargar seguidos');

}

}