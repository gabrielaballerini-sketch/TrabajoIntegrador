import {Comentario} from '../models/Comentario.js';

export const crearComentario = async(req,res)=>{


 // enviar en formuuuu, obtengo lod datos del cuerpo de la peticion.

   try{


   /*

    console.log('ENTRE');

    console.log('BODY:', req.body);

    console.log('PARAMS:', req.params);

    console.log('SESSION:', req.session.usuario);

  */

    const {contenido} = req.body;

    const {imagenId} = req.params;

    const usuario = req.session.usuario;

    //console.log('contenido', contenido);

    //console.log('imagenId', imagenId);

    //console.log('usuario id', usuario?.id);

    await Comentario.create({

      contenido,

      usuario_id: usuario.id,

      imagen_id: imagenId

    });

    //console.log('COMENTARIO CREADOOOOOOO');

    res.redirect(`/home?imagenActiva=${imagenId}`);
 

  }catch(error){

 //   console.log('ERROR COMPLETOOOOOO');
   // console.log(error);


       res.redirect('/home');

  }

}