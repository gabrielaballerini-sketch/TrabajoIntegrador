
import {Usuario} from './Usuario.js'
import {Publicacion} from'./Publicacion.js'
import {Imagen} from'./Imagen.js'
import {Like} from'./Like.js'
import {Etiqueta} from './Etiqueta.js'
import {Comentario} from'./Comentario.js'
import {Seguidor} from'./Seguidor.js'
import {Chat} from'./Chat.js'
//import {Denuncia} from'./Denuncia.js'
import {Notificacion} from'./Notificacion.js'




Usuario.hasMany(Publicacion,{foreignKey:'usuario_id',onDelete:'CASCADE'});
Publicacion.belongsTo(Usuario,{foreignKey:'usuario_id'})


Publicacion.hasMany(Imagen,{foreignKey:'publicacion_id',onDelete:'CASCADE'});
Imagen.belongsTo(Publicacion,{foreignKey:'publicacion_id'})

Usuario.hasMany(Comentario,{foreignKey:'usuario_id',onDelete:'CASCADE'});
Comentario.belongsTo(Usuario,{foreignKey:'usuario_id'})

Publicacion.hasMany(Comentario,{foreignKey:'publicacion_id',onDelete:'CASCADE'});
Comentario.belongsTo(Publicacion,{foreignKey:'publicacion_id'})



Imagen.hasMany(Like,{foreignKey:'imagen_id',onDelete:'CASCADE'});
Like.belongsTo(Imagen,{foreignKey:'imagen_id'})


//de muchos a muchos
Usuario.belongsToMany(Usuario,{through:Seguidor, // tabla intermedia
as :'Seguidos', // los q YO sigo
//clave mi usuario
foreignKey:'seguidor_id',// mi id
//clave del q sigo
otherKey:'seguido_id' // id del q sigo


})



//envia..........//VER SI NECESITO PONERLE AS REMITENTE EN LA SEGUNDA
Usuario.hasMany(Chat,{foreignKey:'remitente_id',as:'mensajesEnviados' })
Chat.belongsTo(Usuario,{foreignKey:'remitente_id',as:'remitente' })

//recibe
Usuario.hasMany(Chat,{foreignKey:'destinatario_id',as:'mensajesRecibidos' })
Chat.belongsTo(Usuario,{foreignKey:'destinatario_id',as:'destinatario'  })



//VER SI NECESITO PONERLE AS DESTINATARIO EN LA SEGUNDA
Usuario.belongsToMany(Usuario,{
through:Seguidor,
as:'Seguidores',
foreignKey:'seguido_id',
otherKey:'seguidor_id', 

})



//ver si en seugnda debo poner as receptor
Usuario.hasMany(Notificacion,{foreignKey:'usuario_id',as:'notificaciones'})
Notificacion.belongsTo(Usuario,{foreignKey:'usuario_id', as:'receptor'})

Usuario.hasMany(Notificacion,{foreignKey:'actor_id', as:'accionesGeneradas'})
Notificacion.belongsTo(Usuario,{foreignKey:'actor_id', as:'actor'})


/*
Usuario.hasMany(Denuncia,{
foreignKey:'usuario_id',
as:'denunciasRealizadas',



})



Denuncia.belongsTo(Usuario,{
foreignKey:'usuario_id',
as:'usuario'


})
*/
//relacion usuario like?? 

