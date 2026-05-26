import { Op } from 'sequelize';

import { Publicacion } from '../models/Publicacion.js';
import { Imagen } from '../models/Imagen.js';

import { Etiqueta } from '../models/Etiqueta.js';

import { Usuario } from '../models/Usuario.js';

import { Comentario } from '../models/Comentario.js';

export const buscar = async (req, res) => {

  try {

    const { texto, usuario, etiqueta } = req.query;

    // filtros 
    const wherePublicacion = {};

    const whereUsuario = {};

    const whereEtiqueta = {};



    // buscar por texto
    if (texto) {

      wherePublicacion[Op.or] = [

        {
          titulo: {
            [Op.iLike]: `%${texto}%`
          }
        },

        {
          descripcion: {
            [Op.iLike]: `%${texto}%`
          }
        }

      ];

    }




    // buscar por usuario
    if (usuario) {

      whereUsuario.nombre = {
        [Op.iLike]: `%${usuario}%`
      };

    }






    // buscar por etiqueta
    if (etiqueta) {

      whereEtiqueta.nombre = {
        [Op.iLike]: `%${etiqueta}%`
      };

    }

    const publicaciones = await Publicacion.findAll({

      where: wherePublicacion,

      include: [

        {
          model: Imagen,
          as: 'imagenes',

          include: [

            {
              model: Comentario,
              as:'comentarios',

              include: [
                {
                  model: Usuario,
                  as: 'usuario' 
                }
              ]

            }

          ]

        },

        {
          model: Etiqueta,
          as: 'etiquetas',
          where: whereEtiqueta,
          required: false
        },

        {
          model: Usuario,
          as: 'autor',
          where: whereUsuario,
          required: false
        }

      ]

    });



    // convertir imágenes


    publicaciones.forEach(publicacion => {


        
      publicacion.imagenes.forEach(imagen => {

        imagen.src = `data:image/${imagen.metadata};base64,${imagen.data.toString('base64')}`;

      });

    });

    res.render('buscador', {

      publicaciones,

      filtros: {
        texto,
        usuario,
        etiqueta
      }

    });

  } catch (error) {

    console.log(error);

    res.status(500).send('Error en búsqueda');

  }

};