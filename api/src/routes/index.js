//! MAIN ROUTER
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();
const videogamesRouter = require('./videogamesRouter')
const genresRouter = require('./genresRouter')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
mainRouter.use('/videogames', videogamesRouter)
mainRouter.use('/genres', genresRouter)

module.exports = mainRouter
