import express from 'express'
import 'dotenv/config';
import authRouter from './routes/auth.js'
import sequelize from './models/config.js'

import session from 'express-session';


import './models/sync.js'

import {mostrarHome}from './controller/homeController.js'


import { Usuario } from './models/Usuario.js';
import { Seguidor } from './models/Seguidor.js';



// Middlewares
import { auth } from './middlewares/authMiddlewares.js';


//rutas
import publicaciones from './routes/routerPublicaciones.js'
import home from './routes/routerHome.js'
import perfil from './routes/routerPerfil.js'

import comentarios from './routes/routerComentarios.js';

import buscador from './routes/routerBuscador.js'

import usuarioRoutes from './routes/routerUsuarios.js';

import routerValoracion from './routes/routerValoracion.js'



const PORT = process.env.PORT;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));






// permite que, una vez que alguien inicia sesión, la página lo recuerde
app.use(session({
secret: process.env.SESSION_KEY,
resave: false, //Le dice a la sesión que no vuelva a guardarse en el servidor si no hubo cambio
saveUninitialized: false,//Evita que se guarden sesiones "vacías" de gente que entra a la web pero no hace login
cookie: { secure: false,
maxAge: 24 * 60 * 60 * 365 * 1000   
 
}
}))



app.use((req,res,next)=>{

  res.locals.usuario=req.session.usuario;

  next();


})



app.use(async (req, res, next) => {
  if (req.session.usuario) {
    try {
      res.locals.cantidadSeguidores = await Seguidor.count({ where: { seguido_id: req.session.usuario.id } });
      res.locals.cantidadSiguiendo = await Seguidor.count({ where: { seguidor_id: req.session.usuario.id } });
    } catch {
      res.locals.cantidadSeguidores = 0;
      res.locals.cantidadSiguiendo = 0;
    }
  } else {
    res.locals.cantidadSeguidores = 0;
    res.locals.cantidadSiguiendo = 0;
  }
  next();
});






// MOTOR DE PLANTILLAS

app.set('view engine','pug')
app.set('views', './views');


//app.use(auth);
app.get('/', (req, res) => {
res.render('index');
})


app.use('/auth',authRouter)


//me voy a mi router publicacion
app.use('/publicaciones',publicaciones)


app.use('/perfil',auth, perfil)

app.use('/home', home)


app.use('/comentarios',auth, comentarios);

app.use('/buscador',buscador)


app.use('/usuarios', usuarioRoutes);

app.use('/valoraciones',auth,  routerValoracion);









//sincronizamos la bd con sync
sequelize.sync()
  .then(()=>{
    // SERVIDOR
    app.listen(PORT, (err) => {
      if(err) {
        console.error('Error al iniciar el servidor:', err);
        return;
      }
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error sincronizando con bd:', err)
  })


export default app;






