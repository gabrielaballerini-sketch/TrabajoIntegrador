import { Publicacion } from "../models/Publicacion.js";
import { Imagen } from "../models/Imagen.js";
import { Comentario } from "../models/Comentario.js";
import { Usuario } from "../models/Usuario.js";
import { Seguidor } from "../models/Seguidor.js";

export const mostrarPerfil = async (req, res) => {
  try {

    //verifico si inicio sesion
    if (!req.session.usuario) {
      return res.redirect('/auth/login');
    }

   
    // VOY A BD TRAE PUBLICAC E IMAGENES   
    const usuario = req.session.usuario;

  //traigo publicacion , incluye imagen y comentario(aca tb pone usuario)

    const publicaciones1 = await Publicacion.findAll({
      where: { usuario_id: usuario.id },
      include: [
        {
          model: Imagen,
          as: 'imagenes',
          include: [
            {
              model: Comentario,
              as: 'comentarios',
              include: [{ model: Usuario, as: 'usuario' }]
            }
          ]
        },
        { model: Usuario, as: 'autor' }
      ]
    });
     
     //sequelize devuelve objetos complejos 
    // Convertimos a objetos planos de JS para poder mutar los datos
   
    const publicaciones = publicaciones1.map(p => p.get({ plain: true }));

    // imag en bd en binario (buffer) 
    // el navegador no puede con ellos, lo converitmos a texto base 64
    for (const publicacion of publicaciones) {
      for (const imagen of publicacion.imagenes || []) {
        if (!imagen?.data) continue;
        const imagenBase64 = imagen.data.toString('base64');
        const sufijo = `data:image/${imagen.metadata};base64,`;
        imagen.src = sufijo + imagenBase64;
      }
    }

    // Contar a cuántos usuarios sigo yo
    const cantidadSiguiendo = await Seguidor.count({
      where: { seguidor_id: usuario.id }
    });

    // Contar cuántos usuarios me siguen a mí
    const cantidadSeguidores = await Seguidor.count({
      where: { seguido_id: usuario.id }
    });

    // Enviamos los contadores a la vista
    res.render('perfil', {
      usuario,
      publicaciones,
      usuarioLogueado: req.session.usuario,
      siguiendo: false, // En mi propio perfil no me sigo a mí mismo
      cantidadSiguiendo,   
      cantidadSeguidores   
    });

  } catch (error) {
    console.error("ERROR PERFIL:", error);
    return res.status(500).send("Error en perfil");
  }
};


// lo que es publico 
// se usa cuando das click , usas la URL como parametro
export const mostrarPerfilPublico = async (req, res) => {
  try {

  console.log("=== ENTRANDO A PERFIL PÚBLICO ===");
    console.log("params:", req.params);
    console.log("session:", req.session.usuario);

    if (!req.session.usuario) {
      return res.redirect('/auth/login');
    }

    const usuarioId = req.params.id;
    
    // Convertimos a número de forma segura para evitar problemas en Postgres
    const idVisitadoNum = parseInt(usuarioId, 10);
    const miIdNum = parseInt(req.session.usuario.id, 10);

    // Si por error toco mi propio usuario, me manda al perfil privado
    if (idVisitadoNum === miIdNum) {
      return res.redirect('/perfil');
    }
    
    // usuario del perfil visitado
    //buscamos x clave primaria, sii no existe paro
    const usuario = await Usuario.findByPk(idVisitadoNum);

    if (!usuario) {
      return res.send('Usuario no encontrado');
    }

    // publicaciones de ese usuario
    const publicacionesBD = await Publicacion.findAll({
      where: { usuario_id: idVisitadoNum }, //  Usamos el número seguro
      include: [
        {
          model: Imagen,
          as: 'imagenes',
          include: [
            {
              model: Comentario,
              as: 'comentarios',
              include: [
                {
                  model: Usuario,
                  as: 'usuario'
                }
              ]
            }
          ]
        },
         { model: Usuario, as: 'autor' }
      ]
    });

    const publicaciones = publicacionesBD.map(p => p.get({ plain: true }));

    // base64
    for (const publicacion of publicaciones) {
      for (const imagen of publicacion.imagenes || []) {
        if (!imagen.data) continue;
        const base64 = imagen.data.toString('base64');
        imagen.src = `data:image/${imagen.metadata};base64,${base64}`;
      }
    }

    // verificar si ya lo sigue
    //Busca un registro donde tú seas el seguidor_id y el 
    // dueño del perfil sea el seguido_id.
    const relacion = await Seguidor.findOne({
      where: {
        seguidor_id: miIdNum,  //  Cambiado por número seguro
        seguido_id: idVisitadoNum //  Cambiado por número seguro
      }
    });

    // Contar a cuántos usuarios sigue el dueño de ESTE perfil
    const cantidadSiguiendo = await Seguidor.count({
      where: { seguidor_id: idVisitadoNum } 
    });

    // Contar cuántos usuarios siguen al dueño de ESTE perfil
    const cantidadSeguidores = await Seguidor.count({
      where: { seguido_id: idVisitadoNum } 
    });

 const publicacionesFiltradas = publicaciones.filter(pub => {
      const esPublica = pub.imagenes[0]?.licencia !== 'copyright';
      const sigueAlAutor = !!relacion;
      return esPublica || sigueAlAutor;
    });






    console.log("=== CONTROL DE BOTÓN ===");
    console.log("¿Encontró relación en BD?:", relacion);
    console.log("¿Qué le llega a siguiendo?:", !!relacion);
    console.log("ID del perfil visitado:", idVisitadoNum);
    console.log("ID tuyo (logueado):", miIdNum);
    
     console.log("USUARIO VISITADO:", usuario.id);
console.log("USUARIO LOGUEADO:", req.session.usuario.id);
console.log("SIGUIENDO:", !!relacion);



   
console.log("RELACION:", relacion);

    res.render('perfil', {
      usuario,
       publicaciones: publicacionesFiltradas,
      usuarioLogueado: req.session.usuario,
      siguiendo: !!relacion, 
      cantidadSiguiendo,
      cantidadSeguidores
    });

  } catch (error) {
    console.error("ERROR PERFIL PÚBLICO:", error);
    res.status(500).send('Error perfil público');
  }
};