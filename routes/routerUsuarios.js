import { Router } from 'express';

import{mostrarPerfilPublico, mostrarPerfil} from '../controller/perfilController.js'

import { seguirUsuario, dejarDeSeguir } from '../controller/seguidorController.js';


const router=Router();

// vistas / perfilController
//router.get('/perfil', mostrarPerfil);
router.get('/:id', mostrarPerfilPublico);

// acciones /seguidorController
router.post('/:id/seguir', seguirUsuario);
router.post('/:id/dejar-seguir', dejarDeSeguir);




export default router;