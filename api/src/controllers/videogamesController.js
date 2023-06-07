const axios = require('axios')
const { Videogame , Genre } = require('../db')
require('dotenv').config();
const { 
    API_URL,
    API_KEY,
} = process.env


//!/************************************************************************************************************ */
const getVideoGamesApi = async() => { 
    const response = (
        await axios.get(`${API_URL}=${API_KEY}`)
        )
        let result = [];//1, 2 ---> next 3
        for (let i = 0; i < 5; i++) {
        result = [...result, ...response.data.results];
          response = await axios.get(response.data.next);//esto se repite 5 veces. // string url
        }
    
        const data = result.map((el) => {
        return {
            id: el.id,
            name: el.name,
            description: el.description,
            released: el.released,
            rating: el.rating,
            img: el.background_image,
            platforms: el.platforms.map((p) => p.platform.name),
            genres: el.genres.map((g) => g.name),
        }
        })
        return data;
    }

//!/*********************************************************************************************************** */

const getDbVideoGames = async() => { 
    const gamesOnDb = await Videogame.findAll({
        include: { 
            model:Genre,
            attributes:['name'],
            through: { 
                attributes:[]
            }
        }
    })
    if(gamesOnDb.length === 0) { 
        throw new Error('No se encontraron juegos en la base de datos.')
    }
    return gamesOnDb
}

//!/******************************************************************************************************************** */

const getAllGames = async() =>  {
    const gamesOnDb = await getDbVideoGames()
    const gamesOnApi =  await getVideoGamesApi()
    const allgames = [...gamesOnDb, ...gamesOnApi]
    if(allgames.length === 0) { 
        throw new Error('Algo ha salido mal!')
    }
    return allgames
}

//!/******************************************************************************************************************************** */

const getVideoGameByName = async (name) => { 
    let apiGames = await axios.get(
        `${API_URL}=${API_KEY}&search=${name}`
    )
    const dbGames = await getDbVideoGames()
    let allGames = [...apiGames.data.results, ...dbGames]

    let nameOfGames = allGames.filter((element) => { 
        element.name.toLowerCase().includes(name.toLowerCase())
    })
    const data = nameOfGames.map((el) => { 
        return { 
            id:el.id,
            name: el.name,
            description: el.description,
            released: el.released,
            rating: el.rating,
            img: el.createdInDb ? el.image : el.background_image,
            platforms: el.createdInDb ?
            el.platforms :
            el.platforms.map((platform) => platform.platform.name),
            genres: el.genres.map((genre) => genre.name),
        }
    })
    if(data.length === 0) { 
        throw new Error('Algo salio mal!')
    }
    return data 
}

//!/******************************************************************************************************* */

const getVideoGameById = async (id) => { 
if(isNaN(id)) { 
    let idDb = await Videogame.findOne({
        where: { 
            id:id,
        },
        include: {
            model:Genre,
            attributes:['name'],
            through: {
            attributes: [],
            },
        }
    })
    if(!idDb) { 
        throw new Error('No se econtro el juego con el id solicitado.')

    }
    return idDb
} else { 
    const findGameById = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    )
    if(!findGameById) { 
        throw new Error('No se encontro el juego solicitado.')
    }
    return{
        id:findGameById.data.id,
        name: findGameById.data.name,
        description:findGameById.data.description,
        released:findGameById.data.released,
        rating:findGameById.data.rating,
        image:findGameById.data.background_image,
        platforms:findGameById.data.platforms.map(p => p.platform.name),
        genres:findGameById.data.genres.map(g => g.name)
    }
}
}

//!/**************************************************************************************** */

const createGame = async (game) => { 
    try {
        const { genres } = game
        const newGame = await Videogame.create(game)
        genres.map(async el => {
            let genreGameDb = await Genre.findOne({
                where:{
                    name:el,
                }
            })
            await newGame.addGenre(genreGameDb)
        })
        if(!newGame) { 
            throw new Error('Error, no se creo el juego!')
        }
        const gameCreated = await Videogame.findOne({
            where: {
                id:newGame.id
            },
            include:{
                model:Genre,
                attributes:[],
                through:{
                    attributes:[],
                }
            }
        })
        return gameCreated
    } catch (error) {
            return {error:error.message}
}
}

//!/************************************************************************ */

const editG = async (game,id) => { 
    try {
        const { name, description, platforms, genres } = game;
        const editedGame = await Videogame.upddate({
            name:name,
            description:description,
            platforms:platforms,
        },
        {
            where:{
                id:id
            }
        })
        if(!editedGame) { 
            throw new Error('no se encuentra el juego.')
        }

        const gameUpdated = await Videogame.findOne({
            where: {
                id:id
            }
        })
        await genres.forEach(async (el) => { 
            let genreFind = await Genre.findOne({
                where:{
                    name:el,
                }
            })
        
        const gameFind = await Videogame.findOne({
            where: {
                name:el
            },
            include:[Genre]
        })
        await gameFind.setGenres([])
        await gameUpdated.addGenre(genreFind)
    })
    return{
        message:'juego modificado',
        result: gameUpdated
    }
    } catch (error) {
        return {error:error.message}
    }
}

//!/******************************************************************************* */

const deleteGame = async (id) => {

    const findGame = await Videogame.findOne({
        where:{
            id:id
        },
    })
    if(!findGame) { 
        throw new Error('No se encontro el juego')
    } else {
        await findGame.destroy()
    }
    return (`juego ${findGame} fue eliminado con exito.`)
}

module.exports = { 
    getVideoGamesApi,
    getDbVideoGames,
    getAllGames,
    getVideoGameByName,
    getVideoGameById,
    createGame,
    editG,
    deleteGame,
}