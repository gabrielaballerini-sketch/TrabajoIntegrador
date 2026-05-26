import { Router } from "express"
import { Usuario } from '../models/Usuario.js';
import { signup,login,mostrarLogin,logout } from "../controller/auth.js";





const router = Router()


router.post('/signup', signup);

router.get('/login', mostrarLogin);

router.post('/login',login)

router.get('/logout', logout);

router.get('/signup', (req, res) => {
  res.render('auth/signup')
})

router.get('/anonimo', (req, res) => {
  res.render('auth/anonimo')
})







export default router