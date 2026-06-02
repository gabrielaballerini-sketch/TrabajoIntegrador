import { Valoracion } from '../models/Valoracion.js';
import { Imagen } from '../models/Imagen.js'; // Asegurate de importar el modelo
import { Publicacion } from '../models/Publicacion.js';


export async function valorarImagen(req, res) {
    try {
        const { imagenId } = req.params;
        const { puntaje } = req.body;
        const usuarioId = req.session.usuario.id;

        // primerin Buscao la imagen para obtener su autor
       const imagen = await Imagen.findByPk(imagenId, {
       include: [{
            model: Publicacion
              }]
               });
          




        if (!imagen) {
            return res.status(404).send('Imagen no encontrada');
        }
  

        const autorId = imagen.Publicacion.usuario_id;

        
          //verifico q no sea el autor para q no se valore a si mismo
         if (String(autorId) === String(usuarioId)) {

            return res.status(400).send(
              'No puedes valorar tu propia imagen'
              );
            }




        // veo si ya voto antesss
        const existe = await Valoracion.findOne({
            where: {
                usuario_id: usuarioId,
                imagen_id: imagenId
            }
        });

        if (existe) {
          return res.redirect('/home?aviso=ya_votaste');
        }




        // guaro en bd  la valoración
        await Valoracion.create({
            puntaje,
            usuario_id: usuarioId,
            imagen_id: imagenId
        });

        return res.redirect(`/home#pub-${imagen.Publicacion.id}`);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al registrar valoración');
    }
}