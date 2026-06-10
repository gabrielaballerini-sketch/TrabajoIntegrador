import { Op } from 'sequelize';
import { Publicacion } from '../models/Publicacion.js';
import { Imagen } from '../models/Imagen.js';
import { Etiqueta } from '../models/Etiqueta.js';
import { Usuario } from '../models/Usuario.js';
import { Comentario } from '../models/Comentario.js';
import { Seguidor } from '../models/Seguidor.js';
import { Valoracion } from '../models/Valoracion.js';

export const buscar = async (req, res) => {
  try {
    const { texto, usuario, etiqueta } = req.query;
    const usuarioLogueado = req.session.usuario;

    const wherePublicacion = {};
    const whereUsuario = {};
    const whereEtiqueta = {};

    if (texto) {
      wherePublicacion[Op.or] = [
        { titulo: { [Op.iLike]: `%${texto}%` } },
        { descripcion: { [Op.iLike]: `%${texto}%` } }
      ];
    }

    if (usuario) {
      whereUsuario.nombre = { [Op.iLike]: `%${usuario}%` };
    }

    if (etiqueta) {
      whereEtiqueta.nombre = { [Op.iLike]: `%${etiqueta}%` };
    }

    const publicaciones1 = await Publicacion.findAll({
      where: wherePublicacion,
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
        {
          model: Etiqueta,
          as: 'etiquetas',
          where: whereEtiqueta,
          required: Object.keys(whereEtiqueta).length > 0
        },
        {
          model: Usuario,
          as: 'autor',
          where: whereUsuario,
          required: Object.keys(whereUsuario).length > 0
        }
      ]
    });

    const publicaciones = publicaciones1.map(p => p.get({ plain: true }));

   
    let idsSeguidos = [];
    if (usuarioLogueado) {
      const misSeguidos = await Seguidor.findAll({
        where: { seguidor_id: usuarioLogueado.id }
      });
      idsSeguidos = misSeguidos.map(s => s.seguido_id);
    }


    const publicacionesFiltradas = publicaciones.filter(pub => {
      const esPublica = pub.imagenes[0]?.licencia !== 'copyright';
      const esMia = usuarioLogueado && pub.autor && String(pub.autor.id) === String(usuarioLogueado.id);
      const sigueAlAutor = pub.autor && idsSeguidos.includes(pub.autor.id);
      return esPublica || esMia || sigueAlAutor;
    });

    // Calcular src, valoraciones, puedeVotar
    for (const publicacion of publicacionesFiltradas) {
      for (const imagen of publicacion.imagenes || []) {
        if (!imagen?.data) continue;
        imagen.src = `data:image/${imagen.metadata};base64,${imagen.data.toString('base64')}`;
        const valoraciones = imagen.valoraciones || [];
        imagen.cantidadValoraciones = valoraciones.length;
        imagen.promedio = valoraciones.length
          ? (valoraciones.reduce((acc, v) => acc + v.puntaje, 0) / valoraciones.length).toFixed(1)
          : 0;
        imagen.miVoto = usuarioLogueado
          ? (valoraciones.find(v => String(v.usuario_id) === String(usuarioLogueado.id))?.puntaje || null)
          : null;
        imagen.puedeVotar = usuarioLogueado
          && publicacion.autor
          && String(publicacion.autor.id) !== String(usuarioLogueado.id)
          && !imagen.miVoto;
      }
      if (publicacion.autor && usuarioLogueado) {
        publicacion.siguiendoAutor = idsSeguidos.includes(publicacion.autor.id);
      } else {
        publicacion.siguiendoAutor = false;
      }
    }

    res.render('buscador', {
      publicaciones: publicacionesFiltradas,
      filtros: { texto, usuario, etiqueta },
      usuarioLogueado
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Error en búsqueda');
  }
};