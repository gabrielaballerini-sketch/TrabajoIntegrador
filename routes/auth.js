import { Router } from "express"
import { Usuario } from '../models/Usuario.js';
import { login,signup, logout, loginForm, signupForm  } from "../controller/auth.js";



const router = Router()


//registro
router.get('/signup',signupForm);

//luego mostrara , desp del envio
router.post('/signup', signup);

//entro 
router.get('/login', loginForm);
//proceso
router.post('/login',login)


//cierro
router.get('/logout', logout);



router.get('/anonimo', (req, res) => {
  res.render('auth/anonimo')
})







export default router