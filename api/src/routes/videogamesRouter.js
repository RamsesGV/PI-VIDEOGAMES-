//!HANDLERS PARA LAS RUTAS

const { Router } = require('express')
const videogamesRouter = Router()

const { 
    getVideogamesHandler,
    getVideogameIdHandler,
    createGameHandler,
    //getVideoGameNameHandler
    
} = require('../handlers/videogamesHandler')

videogamesRouter.get('/',getVideogamesHandler)
videogamesRouter.get('/:id',getVideogameIdHandler)
videogamesRouter.put('/')
videogamesRouter.delete('/')
videogamesRouter.post('/', createGameHandler)
//videogamesRouter.get('/',getVideoGameNameHandler) // preguntar a nico que diablos paso aqui.

module.exports = videogamesRouter