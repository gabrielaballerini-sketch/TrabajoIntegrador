import { Denuncia } from '../models/Denuncia.js';
import { Imagen } from '../models/Imagen.js';
import { Publicacion } from '../models/Publicacion.js';

export const crearDenuncia = async (req, res) => {
  try {
    const usuario = req.session.usuario;
    const { tipo, elemento_id, motivo_id, descripcion } = req.body;

    // 1. Verificar que no haya denunciado este elemento antes
    const yaDenuncio = await Denuncia.findOne({
      where: {
        usuario_id: usuario.id,
        tipo,
        elemento_id
      }
    });

    if (yaDenuncio) {
      return res.json({ ok: false, error: 'ya_denunciaste', tipo });
    }

    // 2. Crear la denuncia
    await Denuncia.create({
      usuario_id: usuario.id,
      tipo,
      elemento_id,
      motivo_id,
      descripcion
    });

    // 3. Solo si es denuncia de imagen
    if (tipo === 'imagen') {

      const cantidadDenuncias = await Denuncia.count({
        where: { tipo: 'imagen', elemento_id },
        distinct: true,
        col: 'usuario_id'
      });

      const imagen = await Imagen.findByPk(parseInt(elemento_id));

      if (imagen) {

  console.log('=== DEBUG DENUNCIA ===');
  console.log('elemento_id recibido:', elemento_id);
  console.log('elemento_id parseado:', parseInt(elemento_id));
  console.log('imagen.id:', imagen.id);
  console.log('imagen.publicacion_id:', imagen.publicacion_id);
  console.log('cantidadDenuncias:', cantidadDenuncias);
  console.log('¿llega al if >= 3?:', cantidadDenuncias >= 3);







        await Publicacion.update(
          { modificable: false },
          { where: { id: imagen.publicacion_id } }
        );


console.log('Cantidad de denuncias:', cantidadDenuncias);
console.log('Imagen encontrada:', imagen?.id);
console.log('Publicación:', imagen?.publicacion_id);

        if (cantidadDenuncias >= 3) {
          await Publicacion.update(
            { estado: 'en_revision' },
            { where: { id: imagen.publicacion_id } }
          );
        }
      }
    }


// como usamos fetch (de denuncias.js)  el servidor no puede responder a un res.redirect
// responde entonces a un json . 

    res.json({ ok: true, tipo });

  } catch (error) {
    console.error('Error al crear denuncia:', error.message);
    res.status(500).json({ ok: false, error: 'server_error' });
  }
};