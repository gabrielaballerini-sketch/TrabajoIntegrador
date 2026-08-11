import { Publicacion } from '../models/Publicacion.js';
import { Imagen } from '../models/Imagen.js';
import { Comentario } from '../models/Comentario.js';
import { Usuario } from '../models/Usuario.js';
import { Denuncia } from '../models/Denuncia.js';
import { MotivoDenuncia } from '../models/MotivoDenuncia.js';

export const mostrarPanel = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      where: { estado: 'en_revision' },
      include: [
        {
          model: Imagen,
          as: 'imagenes',
          include: [
            {
              model: Denuncia,
              as: 'denuncias',
              include: [
                { model: Usuario, as: 'denunciante' },
                { model: MotivoDenuncia, as: 'motivoDenuncia' }
              ]
            }
          ]
        },
        { model: Usuario, as: 'autor' }
      ]
    });

    // convertir imágenes a base64
    const publicacionesPlanas = publicaciones.map(p => p.get({ plain: true }));

    for (const pub of publicacionesPlanas) {
      for (const img of pub.imagenes || []) {
        if (!img.data) continue;
        const base64 = img.data.toString('base64');
        img.src = `data:image/${img.metadata};base64,${base64}`;
      }
    }

    res.render('validador', {
      publicaciones: publicacionesPlanas,
      usuarioLogueado: req.session.usuario
    });

  } catch (error) {
    console.error('Error en panel validador:', error.message);
    res.status(500).send('Error en panel validador');
  }
};

export const darDeBaja = async (req, res) => {
  try {
    const { id } = req.params;

    await Publicacion.update(
      { estado: 'dada_de_baja' },
      { where: { id } }
    );

    // contar publicaciones dadas de baja del autor
    const publicacion = await Publicacion.findByPk(id);

    const cantidadBajas = await Publicacion.count({
      where: {
        usuario_id: publicacion.usuario_id,
        estado: 'dada_de_baja'
      }
    });

    // si llega a 3, inactivar la cuenta
    if (cantidadBajas >= 3) {
      await Usuario.update(
        { activo: false },
        { where: { id: publicacion.usuario_id } }
      );
    }

    res.redirect('/validador');

  } catch (error) {
    console.error('Error al dar de baja:', error.message);
    res.status(500).send('Error al dar de baja');
  }
};

export const desestimar = async (req, res) => {
  try {
    const { id } = req.params;

    // borramos las denuncias de esa publicación
    const imagenes = await Imagen.findAll({ where: { publicacion_id: id } });

    for (const imagen of imagenes) {
      await Denuncia.destroy({
        where: { tipo: 'imagen', elemento_id: imagen.id }
      });
    }

    // volvemos la publicación a activa y modificable
    await Publicacion.update(
      { estado: 'activa', modificable: true },
      { where: { id } }
    );

    res.redirect('/validador');

  } catch (error) {
    console.error('Error al desestimar:', error.message);
    res.status(500).send('Error al desestimar');
  }
};