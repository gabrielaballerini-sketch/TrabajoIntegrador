import express from 'express'
import 'dotenv/config';
import authRouter from './routes/auth.js'
import sequelize from './models/config.js'
import './models/UsuarioModels.js'
import './models/PublicacionModels.js'
import './models/ImagenModels.js'


const PORT = process.env.PORT;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MOTOR DE PLANTILLAS

app.set('view engine','pug')
app.set('views', './views');


//app.use(auth);
app.get('/', (req, res) => {
res.render('index');
})


app.use('/auth',authRouter)




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








