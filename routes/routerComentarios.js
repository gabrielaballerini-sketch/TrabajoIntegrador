import express from 'express';

import {crearComentario} from '../controller/comentarioController.js';


const router = express.Router();

router.post('/:imagenId', crearComentario);

export default router;