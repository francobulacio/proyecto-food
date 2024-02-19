const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipe = require('./recipeRoute.js')
const diet = require('./dietRoute.js')
const home = require('./homeRoute.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipe', recipe);
router.use('/diet', diet);
router.use('/home', home);

module.exports = router;
