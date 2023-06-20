const { Router } = require('express')
const router = Router()
const {
getGameByName,
getGameById,
createGame,
getAllGames,
editGame,
deleteGame
} = require('../../controllers/gamesController.js')


//!-----------------------------------------------------------------------------

/*
Esta ruta responde a la solicitud GET a la ruta '/api/games'.
Si se proporciona un parámetro de consulta 'name', 
significa que se está buscando un juego por su nombre.
Si se encuentra un juego que coincide con el nombre proporcionado, 
se devuelve como respuesta el resultado de la búsqueda.
Si no se encuentra ningún juego que coincida con el nombre proporcionado, 
se devuelve un mensaje de error.
Si no se proporciona un nombre en la consulta, 
significa que se desean obtener todos los juegos.
En ese caso, se llama a la función getAllGames para obtener todos los juegos y se devuelven como respuesta.
 */ 

router.get('/', async (req, res) => {
const { name } = req.query
try {
    if (name) {
    const searchResult = await getGameByName(name)
    searchResult.length
        ? res.status(200).json(searchResult)
        : res.status(404).json('No se pudo encontrar el juego')
    } else {
    const games = await getAllGames()
    res.status(200).json(games)
    }
} catch (error) {
    res.status(404).json({ error: error.message })
}
})
//!----------------------------------------------------------------------------------------

//!-----------------------------------------------------------------------------------------------

/*
Esta ruta responde a la solicitud GET a la ruta '/api/games/:id', donde ':id' es el identificador único del juego.
Se obtiene el valor del parámetro de ruta 'id' utilizando req.params.
Se llama a la función getGameById para buscar el juego por su ID.
Si se encuentra el juego, se devuelve como respuesta.
Si no se encuentra el juego, se devuelve un mensaje de error.
 */

router.get('/:id', async (req, res) => {
const { id } = req.params
try {
    const getById = await getGameById(id)
    res.status(200).json(getById)
} catch (error) {
    res.status(404).json({ error: error.message })
}
})
//!-------------------------------------------------------------------------------------------------

//!--------------------------------------------------------------------------------------------------------

/*
Esta ruta responde a la solicitud POST a la ruta '/api/games'.
Se obtiene el objeto del juego a crear desde el cuerpo de la solicitud 
utilizando req.body.
Se llama a la función createGame para crear un nuevo juego 
con los datos proporcionados.
Si el juego se crea correctamente, 
se devuelve como respuesta el juego creado.
Si ocurre algún error durante la creación, 
se devuelve un mensaje de error.
 */

router.post('/', async (req, res) => {
const newGame = req.body
const created = await createGame(newGame)
try {
    res.status(200).json(created)
} catch (error) {
    res.status(404).json({ error: error.message })
}
})
//!-------------------------------------------------------------------------------------------------------

//!---------------------------------------------------------------------------------------------------------

/*
Esta ruta responde a la solicitud PUT a la ruta '/api/games/:id', 
donde ':id' es el identificador único del juego a editar.
Se obtiene el objeto del juego editado desde el cuerpo de la solicitud 
utilizando req.body.
Se obtiene el valor del parámetro de ruta 'id' utilizando req.params.
Se llama a la función editGame para editar el juego con los datos proporcionados y el ID especificado.
Si el juego se edita correctamente, se devuelve como respuesta el juego modificado.
Si ocurre algún error durante la edición, se devuelve un mensaje de error.
 */

router.put('/:id', async (req, res) => {
try {
    const editedGame = req.body
    const { id } = req.params
    const modified = await editGame(editedGame, id)
    res.status(200).json(modified)
} catch (error) {
    res.status(404).json({ error: error.message })
}
})
//!-----------------------------------------------------------------------------------------------------------

//!-------------------------------------------------------------------------------------------------------------------

/*
Esta ruta responde a la solicitud DELETE a la ruta 
'/api/games/:id', donde ':id' es el identificador único del juego a eliminar.
Se obtiene el valor del parámetro de ruta 'id' utilizando req.params.
Se llama a la función deleteGame para eliminar el juego con el ID especificado.
Si el juego se elimina correctamente, 
se devuelve como respuesta un mensaje indicando el nombre del juego eliminado.
Si ocurre algún error durante la eliminación, se devuelve un mensaje de error.
 */ 

router.delete('/:id', async (req, res) => {
try {
    const { id } = req.params;
    const deletedGame = await deleteGame(id)
    res.status(200).json({ message: `El juego "${deletedGame.name}", HA SIDO ELIMINADO` })
} catch (error) {
    res.status(404).json({ error: 'No se pudo eliminar el juego' })
}
})
//!------------------------------------------------------------------------------------------------------------------
module.exports = router
