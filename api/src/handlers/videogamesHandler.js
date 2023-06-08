const { response } = require('express')
const { 
    getVideoGamesApi,
    getDbVideoGames,
    getAllGames,
    getVideoGameByName,
    getVideoGameById,
    createGame,
    editG,
    deleteGame
} = require('../controllers/videogamesController')

const getVideogamesHandler = async(req,res) => { 
    const { name } = req.query
    try {
    if (name) {
        const searchResult = await getVideoGameByName(name)
        const limitedResult = searchResult.slice(0,15)
        limitedResult.length
        ? res.status(200).json(limitedResult)
        : res.status(404).json('No se pudo encontrar el juego')
    } else {
        const games = await getAllGames()
        res.status(200).json(games)
    }
    } catch (error) {
    res.status(404).json({ error: error.message })
    }
    }
    
    //! preguntar a nico que diablos paso aqui.
    //const  getVideoGameNameHandler = async (req,res) => { 
      //  const { name } = req.query
        //console.log(name)
       // try {
           // const response = await getVideoGameByName(name)
         //   if(!response.length) { 
          //      res.status(400).send(`el videojuego con el nombre: ${name} no se encontro.`)
          //  }
          //  res.status(200).json(response)
       // } catch (error) {
        //    res.status(400).json({error:error.message})
        ///}
    //}
    //!/****************************************************************************************** */
    

const getVideogameIdHandler = async (req,res) => { 
    const { id } = req.params
    console.log(`hola hola hola ${id}`)
    let response = await getVideoGameById(id)
    try {
        if (!response) { 
            throw new Error('No se encontro juego con ese id')
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        
        res.status(400).json({error:error.message})
    }

}

const createGameHandler = async(req,res) => { 
    const createdGamenew = req.body
    const created = await createGame(createdGamenew)
    try {
        res.status(200).json(created)
        
    } catch (error) {
        
        res.status(400).json({error:error.message})
        
    }
}




module.exports = { 
    getVideogamesHandler,
    getVideogameIdHandler,
    createGameHandler,
    //getVideoGameNameHandler,
}