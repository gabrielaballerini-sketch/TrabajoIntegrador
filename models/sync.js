
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
import{ImagenEtiqueta} from './ImagenEtiqueta.js'


Usuario.hasMany(Publicacion,{foreignKey:'usuario_id',onDelete:'CASCADE'});
Publicacion.belongsTo(Usuario,{foreignKey:'usuario_id'})


Publicacion.hasMany(Imagen,{foreignKey:'publicacion_id',onDelete:'CASCADE'});
Imagen.belongsTo(Publicacion,{foreignKey:'publicacion_id'})

Usuario.hasMany(Comentario,{foreignKey:'usuario_id'});
Comentario.belongsTo(Usuario,{foreignKey:'usuario_id'})

Publicacion.hasMany(Comentario,{foreignKey:'publicacion_id',onDelete:'CASCADE'});
Comentario.belongsTo(Publicacion,{foreignKey:'publicacion_id'})


Imagen.hasMany(Valoracion,{foreignKey:'imagen_id',onDelete:'CASCADE'});
Valoracion.belongsTo(Imagen,{foreignKey:'imagen_id'})


Usuario.hasMany(Valoracion,{
foreignKey:'usuario_id',
onDelete:'CASCADE'

})

Valoracion.belongsTo(Usuario,{
foreignKey:'usuario_id'

})



Usuario.belongsToMany(Usuario,{
through:Seguidor,
as:'Seguidos',
foreignKey:'seguidor_id',
otherKey:'seguido_id'

})

Usuario.belongsToMany(Usuario,{
through:Seguidor,
as:'Seguidores',
foreignKey:'seguido_id',
otherKey:'seguidor_id'

})


Imagen.hasMany(ImagenEtiqueta, { foreignKey: 'imagen_id', as: 'imagenEtiquetas' })
ImagenEtiqueta.belongsTo(Imagen, { foreignKey: 'imagen_id', as: 'imagen' })

Etiqueta.hasMany(ImagenEtiqueta, { foreignKey: 'etiqueta_id', as: 'etiquetaImagenes' })
ImagenEtiqueta.belongsTo(Etiqueta, { foreignKey: 'etiqueta_id', as: 'etiqueta' })



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


//1
Usuario.hasMany(Coleccion,{foreignKey:'usuario_id',onDelete:'CASCADE'})


Coleccion.belongsTo(Usuario,{foreignKey:'usuario_id',as:'usuario'

})


Coleccion.belongsToMany(Publicacion,{
through:ColeccionPublicacion, 
foreignKey:'coleccion_id',
otherKey:'publicacion_id',
as:'publicaciones',
onDelete:'CASCADE'


})

Publicacion.belongsToMany(Coleccion,{
through:ColeccionPublicacion,
foreignKey:'publicacion_id',
otherKey:'coleccion_id',
as:'colecciones',
onDelete:'CASCADE'
})

Coleccion.hasMany(ColeccionPublicacion,{
foreignKey:'coleccion_id'
})
ColeccionPublicacion.belongsTo(Coleccion,{
foreignKey:'coleccion_id'
    
})

Publicacion.hasMany(ColeccionPublicacion,{
foreignKey:'publicacion_id'

})

ColeccionPublicacion.belongsTo(Publicacion,{
    foreignKey:'publicacion_id'
})






Imagen.belongsToMany(Etiqueta,{
through:ImagenEtiqueta,
foreignKey:"imagen_id",
onDelete:'CASCADE'
});

Etiqueta.belongsToMany(Imagen,{
through:ImagenEtiqueta,
foreignKey:"etiqueta_id",
onDelete:'CASCADE'

})


Imagen.hasMany(ImagenEtiqueta, { foreignKey: 'imagen_id' })
ImagenEtiqueta.belongsTo(Imagen, { foreignKey: 'imagen_id' })

Etiqueta.hasMany(ImagenEtiqueta, { foreignKey: 'etiqueta_id' })
ImagenEtiqueta.belongsTo(Etiqueta, { foreignKey: 'etiqueta_id' })





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

//relacion usuario like?? 

