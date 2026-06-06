import { Router } from 'express';

import{mostrarPerfilPublico, mostrarPerfil} from '../controller/perfilController.js'

import { seguirUsuario, dejarDeSeguir,verSeguidores,verSeguidos, publicacionesDeSeguidos } from '../controller/seguidorController.js';

import { auth } from '../middlewares/authMiddlewares.js';

const router=Router();


router.get('/seguidores',auth, verSeguidores);

router.get('/siguiendo',auth, verSeguidos);

router.get('/siguiendo/publicaciones', auth, publicacionesDeSeguidos);



// vistas / perfilController
//router.get('/perfil', mostrarPerfil);
router.get('/:id', mostrarPerfilPublico);



// acciones /seguidorController
router.post('/:id/seguir',auth,  seguirUsuario);
router.post('/:id/dejar-seguir',auth,  dejarDeSeguir);



export default router;