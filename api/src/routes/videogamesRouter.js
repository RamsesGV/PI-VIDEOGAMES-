//!HANDLERS PARA LAS RUTAS

const { Router } = require('express')
const videogamesRouter = Router()

const { 
    handlers,
} = require('../handlers/videogamesHandler')

videogamesRouter.get('/',)
videogamesRouter.get('/:IdVideogame',)
videogamesRouter.get('/',)
videogamesRouter.get('/')
videogamesRouter.post('/',)

module.exports = videogamesRouter