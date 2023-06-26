// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const { Router } = require('express');
const genresRouter = require('../routes/genresRouter/genres.js')
const gamesApi = require('../routes/gamesRouter/games.js')
const publishersApi = require('../routes/publisherRouter/publisher.js')




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/genres', genresRouter)
router.use('/videogames', gamesApi)
router.use('/publishers', publishersApi)

module.exports = router;


/*
Se importa el módulo Router del paquete express para poder configurar las rutas.
Se importan los routers adicionales, 
en este caso genresRouter y gamesApi, 
que se definen en archivos separados en las rutas correspondientes.
Se crea una instancia del enrutador utilizando Router().
Luego se configuran los routers utilizando el método use() del enrutador. 
Se asigna un prefijo de ruta a cada router. 
En este caso, 
el router genresRouter se configura con el prefijo '/genres' 
y el router gamesApi se configura con el prefijo '/videogames'.
Finalmente, 
se exporta el enrutador para que pueda ser utilizado en otros archivos.
 */