import { Router } from "express";

import { mostrarHome } from "../controller/homeController.js";

const router=Router();

router.get('/', mostrarHome);

export default router;