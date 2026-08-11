import { Router } from 'express';
import { auth, soloValidador } from '../middlewares/authMiddlewares.js';
import { mostrarPanel, darDeBaja, desestimar } from '../controller/validadorController.js';

const router = Router();

router.get('/', auth, soloValidador, mostrarPanel);
router.post('/:id/dar-de-baja', auth, soloValidador, darDeBaja);
router.post('/:id/desestimar', auth, soloValidador, desestimar);

export default router;