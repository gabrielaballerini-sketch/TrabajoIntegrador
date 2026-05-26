import { Publicacion } from '../models/Publicacion.js';
import { Imagen } from '../models/Imagen.js';
import { Etiqueta } from '../models/Etiqueta.js';

//muestro el formulario cuando ingresan 
export const mostrarFormulario = (req, res) => {
  res.render('publicaciones/vistaCrearPublicaciones');
};

//crear 

export const crearPublicacion = async (req, res) => {
  try {
   
    console.log('BODY:', req.body);
    console.log('FILES:', req.files);
 

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

    // imagenes con multer
 

    //req.files hay un middleware (multer) que procesa la subida de archivos
    //extrension: extraigo la extensioN
    //GUARDO LA IMAG EN bd como un archivo binario (file.buffer) 



//  (req.files || []) para evitar que rompa si no se suben fotos
    const archivos = req.files || [];
    
    if (archivos.length > 0) {


      // Usamos Promise.all para guardar todas las imágenes en paralelo (¡Mucho más rápido!)
      const promesasImagenes = archivos.map(file => {



        return Imagen.create({
          data: file.buffer,

          metadata: file.mimetype.split('/')[1], // Extrae 'png', 'jpeg', etc.
          publicacion_id: publicacion.id        // Vincula a la publicación actual
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