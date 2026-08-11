import { Publicacion } from '../models/Publicacion.js';
import { Imagen } from '../models/Imagen.js';
import { Etiqueta } from '../models/Etiqueta.js';

//muestro el formulario cuando ingresan 
export const mostrarFormulario = (req, res) => {
  res.render('publicaciones/crearPublicaciones');
};

//crear 

export const crearPublicacion = async (req, res) => {
  try {
   
    //console.log('BODY:', req.body);
    //console.log('FILES:', req.files);
 

    const { titulo, descripcion, etiquetas } = req.body;
    
    
    const usuario = req.session.usuario;

    const publicacion = await Publicacion.create({
      titulo,
      descripcion,
      usuario_id: usuario.id
    });

    // etiquetas, las limpia separo x espacio en blanco
    // saco espacios trim, pasa minuscula 
    const etiquetasArray = etiquetas
      ? etiquetas.split(' ').map(e => e.trim().toLowerCase()).filter(Boolean)
      : [];


      //recorre el arreglo de etiquetas , si ya existe la etiqueta usamos esa
      // si no la creamos
    for (const nombreEtiqueta of etiquetasArray) {
      const [etiquetaDB] = await Etiqueta.findOrCreate({
         where: {
           nombre: 
           nombreEtiqueta }
           });
      await publicacion.addEtiqueta(etiquetaDB);
    }


    const archivos = req.files || [];
    
    if (archivos.length > 0) {

      const licencia = req.body.licencia || 'sincopyright';

      // Usamos Promise.all para guardar todas las imágenes en paralelo
      const promesasImagenes = archivos.map(file => {



        return Imagen.create({
          data: file.buffer,

          metadata: file.mimetype.split('/')[1], // Extrae 'png', 'jpeg', etc.
          publicacion_id: publicacion.id,    // Vincula a la publicación actual
          licencia: licencia 
        
        });
      });


      await Promise.all(promesasImagenes);
    }




    res.redirect('/home');

  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error al crear publicación');
  }
};
export const eliminarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    await Publicacion.destroy({ where: { id, usuario_id: req.session.usuario.id } });
    res.redirect('/home');
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error al eliminar publicación');
  }
};


export const mostrarFormularioEditar = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = req.session.usuario;

    const publicacion = await Publicacion.findOne({
      where: { id, usuario_id: usuario.id },
      include: [{ model: Etiqueta, as: 'etiquetas' }]
    });

    if (!publicacion) {
      return res.status(404).send('Publicación no encontrada');
    }

    if (!publicacion.modificable) {
      return res.redirect('/home');
    }

    res.render('publicaciones/editarPublicacion', {
      publicacion: publicacion.get({ plain: true }),
      usuarioLogueado: usuario
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al mostrar formulario de edición');
  }
};

export const editarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = req.session.usuario;
    const { titulo, descripcion, etiquetas } = req.body;

    const publicacion = await Publicacion.findOne({
      where: { id, usuario_id: usuario.id }
    });

    if (!publicacion) {
      return res.status(404).send('Publicación no encontrada');
    }

    if (!publicacion.modificable) {
      return res.redirect('/home');
    }

    // actualizamos titulo y descripcion
    await publicacion.update({ titulo, descripcion });

    // actualizamos etiquetas — borramos las anteriores y ponemos las nuevas
    await publicacion.setEtiquetas([]);

    const etiquetasArray = etiquetas
      ? etiquetas.split(' ').map(e => e.trim().toLowerCase()).filter(Boolean)
      : [];

    for (const nombreEtiqueta of etiquetasArray) {
      const [etiquetaDB] = await Etiqueta.findOrCreate({
        where: { nombre: nombreEtiqueta }
      });
      await publicacion.addEtiqueta(etiquetaDB);
    }

    res.redirect('/home');

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al editar publicación');
  }
};