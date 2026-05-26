import express from 'express'
import 'dotenv/config';
import authRouter from './routes/auth.js'
import sequelize from './models/config.js'

import session from 'express-session';


import './models/sync.js'
import publicaciones from './routes/routerPublicaciones.js'
import {mostrarHome}from './controller/homeController.js'
//provisorio
import cookieParser from 'cookie-parser';
//provi
import { Usuario } from './models/Usuario.js';

import perfil from './routes/routerPerfil.js'

import home from './routes/routerHome.js'

import comentarios from './routes/routerComentarios.js';



const PORT = process.env.PORT;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//ver maxAge
app.use(session({
secret: 'fotaza-secreto',
resave: false,
saveUninitialized: false,
cookie: { secure: false,
maxAge: 24 * 60 * 60 * 365 * 1000   
 
}
}))



app.use((req,res,next)=>{

  res.locals.usuario=req.session.usuario;

  next();


})



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


app.use('/perfil', perfil)

app.use('/home', home)



app.use('/comentarios', comentarios);

app.get('/home',mostrarHome);







//sincronizamos la bd con sync
sequelize.sync({ alter: true })
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






//prueba
// sincronizamos la bd con sync

// sequelize.sync({ alter: true })


/*
// PARA PROBAR SI SE ROMPE
app.listen(PORT, (err) => {
  if(err) {
    console.error('Error al iniciar el servidor:', err);
    return;
  }

  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
*/





