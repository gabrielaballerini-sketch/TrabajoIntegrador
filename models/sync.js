
import {Usuario} from './Usuario.js'
import {Publicacion} from'./Publicacion.js'
import {Imagen} from'./Imagen.js'
import {Valoracion} from'./Valoracion.js'
import {Etiqueta} from './Etiqueta.js'
import {Comentario} from'./Comentario.js'
import {Seguidor} from'./Seguidor.js'
import {Mensaje} from'./Mensaje.js'
import {Denuncia} from'./Denuncia.js'
import {Notificacion} from'./Notificacion.js'
import{Coleccion}from './Coleccion.js'
import { ColeccionPublicacion } from './ColeccionPublicacion.js'
import { PublicacionEtiqueta } from './PublicacionEtiqueta.js'
import { Rol } from './Rol.js';
import { MotivoDenuncia } from './MotivoDenuncia.js';


//usuario-publicacion , agregue 2 as
Usuario.hasMany(Publicacion,{foreignKey:'usuario_id',as:'publicaciones',onDelete:'CASCADE'});
Publicacion.belongsTo(Usuario,{foreignKey:'usuario_id', as:'autor'})

//publicacion-imagen, 1 as
Publicacion.hasMany(Imagen,{foreignKey:'publicacion_id',as:'imagenes',onDelete:'CASCADE'});
Imagen.belongsTo(Publicacion,{foreignKey:'publicacion_id'})


Usuario.hasMany(Comentario,{foreignKey:'usuario_id'});
Comentario.belongsTo(Usuario,{foreignKey:'usuario_id', as: 'usuario'})

Imagen.hasMany(Comentario,{foreignKey:'imagen_id',as: 'comentarios',onDelete:'CASCADE'});
Comentario.belongsTo(Imagen,{foreignKey:'imagen_id'})

Imagen.hasMany(Denuncia, { foreignKey: 'elemento_id', as: 'denuncias' });
Denuncia.belongsTo(MotivoDenuncia, { foreignKey: 'motivo_id', as: 'motivoDenuncia' }); 
Denuncia.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'denunciante' }); 


Imagen.hasMany(Valoracion,{foreignKey:'imagen_id', as: 'valoraciones',onDelete:'CASCADE'});
Valoracion.belongsTo(Imagen,{foreignKey:'imagen_id'})


Usuario.hasMany(Valoracion,{
foreignKey:'usuario_id',
onDelete:'CASCADE'

})

Valoracion.belongsTo(Usuario,{
foreignKey:'usuario_id'

})


//bien
Usuario.belongsToMany(Usuario,{
through:Seguidor,
as:'seguidos',
foreignKey:'seguidor_id',
otherKey:'seguido_id',
onDelete: 'CASCADE'
})
//bien
Usuario.belongsToMany(Usuario,{
through:Seguidor,
as:'seguidores',
foreignKey:'seguido_id',
otherKey:'seguidor_id',
onDelete: 'CASCADE'
})






Usuario.hasMany(Mensaje,{foreignKey:'remitente_id',as:'mensajesEnviados',onDelete:'CASCADE' })
Mensaje.belongsTo(Usuario,{foreignKey:'remitente_id',as:'remitente' })

//recibe
Usuario.hasMany(Mensaje,{foreignKey:'destinatario_id',as:'mensajesRecibidos',onDelete:'CASCADE' })
Mensaje.belongsTo(Usuario,{foreignKey:'destinatario_id',as:'destinatario'  })





//ver si en seugnda debo poner as receptor
Usuario.hasMany(Notificacion,{foreignKey:'usuario_id',as:'notificaciones',onDelete:'CASCADE'})
Notificacion.belongsTo(Usuario,{foreignKey:'usuario_id', as:'receptor'})

Usuario.hasMany(Notificacion,{foreignKey:'actor_id', as:'accionesGeneradas',onDelete:'CASCADE'})
Notificacion.belongsTo(Usuario,{foreignKey:'actor_id', as:'actor'})


//bien
Usuario.hasMany(Coleccion,{foreignKey:'usuario_id',onDelete:'CASCADE'})

//bien
Coleccion.belongsTo(Usuario,{foreignKey:'usuario_id',as:'usuario'

})

//agregue as
Coleccion.belongsToMany(Publicacion,{
through:ColeccionPublicacion, 
as:'publicaciones',
foreignKey:'coleccion_id',
otherKey:'publicacion_id',

onDelete:'CASCADE'


})

//agregue as
Publicacion.belongsToMany(Coleccion,{
through:ColeccionPublicacion,
as:'colecciones',
foreignKey:'publicacion_id',
otherKey:'coleccion_id',

onDelete:'CASCADE'
})

Coleccion.hasMany(ColeccionPublicacion,{
foreignKey:'coleccion_id',
onDelete: 'CASCADE'
})
ColeccionPublicacion.belongsTo(Coleccion,{
foreignKey:'coleccion_id'
    
})

Publicacion.hasMany(ColeccionPublicacion,{
foreignKey:'publicacion_id',
onDelete: 'CASCADE'

})

ColeccionPublicacion.belongsTo(Publicacion,{
    foreignKey:'publicacion_id'
})





//borro publicacion, se borra la etiqueta
Publicacion.belongsToMany(Etiqueta,{
  through:PublicacionEtiqueta,

  foreignKey:'publicacion_id',
  otherKey:'etiqueta_id',
  as:'etiquetas',
  onDelete:'CASCADE'
});



// no uso cascade
//si se borra la etiqueta no borro publicacion

Etiqueta.belongsToMany(Publicacion,{
  through:PublicacionEtiqueta,

  foreignKey:'etiqueta_id',
  otherKey:'publicacion_id',
  as:'publicaciones',
   onDelete:'CASCADE'
 
});
 






// usuario con publicacion 


Usuario.hasMany(Denuncia,{
foreignKey:'usuario_id',
as:'denunciasRealizadas',
onDelete:'CASCADE'
})



Denuncia.belongsTo(Usuario,{
foreignKey:'usuario_id',
as:'usuario'


})

Rol.hasMany(Usuario, { foreignKey: 'rol_id', as: 'usuarios' });
Usuario.belongsTo(Rol, { foreignKey: 'rol_id', as: 'rol' });

MotivoDenuncia.hasMany(Denuncia, { foreignKey: 'motivo_id', as: 'denuncias' });
Denuncia.belongsTo(MotivoDenuncia, { foreignKey: 'motivo_id', as: 'motivo' });
