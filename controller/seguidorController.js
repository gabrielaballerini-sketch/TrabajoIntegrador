
import { Seguidor } from "../models/Seguidor.js";

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
