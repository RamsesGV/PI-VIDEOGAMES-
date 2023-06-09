const axios = require('axios')
const { Videogame , Genre } = require('../db')
require('dotenv').config();
const { 
    API_URL,
    API_KEY,
} = process.env


//!/************************************************************************************************************ */
const getVideoGamesApi = async() => { 
    const initialResponse = (
        await axios.get(`${API_URL}=${API_KEY}`)
        )
        let result = [];//1, 2 ---> next 3
        for (let i = 0; i < 5; i++) {
        result = [...result, ...initialResponse.data.results];
          response = await axios.get(initialResponse.data.next);//esto se repite 5 veces. // string url
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
    return[];
    }
    return gamesOnDb
}

//!/******************************************************************************************************************** */

const getAllGames = async () => {
    const gamesOnDb = await getDbVideoGames();
    const gamesOnApi = await getVideoGamesApi();
    let allGames = [];

    if (gamesOnDb.length === 0 && gamesOnApi.length > 0) {
    allGames = gamesOnApi;
    } else if (gamesOnDb.length > 0 && gamesOnApi.length > 0) {
    allGames = [...gamesOnDb, ...gamesOnApi];
    } else if (gamesOnDb.length > 0 && gamesOnApi.length === 0) {
    allGames = gamesOnDb;
    } else {
    throw new Error('Algo ha salido mal!');
    }

    return allGames;
};



//!/******************************************************************************************************************************** */

const getVideoGameByName = async (name) => { 
    let apiGames = await axios.get(
        `${API_URL}=${API_KEY}&search=${name}`
    )
    const dbGames = await getDbVideoGames()
    let allGames = [...apiGames.data.results, ...dbGames]

    let nameOfGames = allGames.filter((element) => {
        return element.name.toLowerCase().includes(name.toLowerCase())
})

    const limitedGames = nameOfGames.slice(0,15)

    const data = limitedGames.map((el) => { 
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
    const { genres } = game;
    
    const newGame = await Videogame.create(game);

    if (genres && Array.isArray(genres) && genres.length > 0) {
        const genrePromises = genres.map(async (el) => {
        let genreGameDb = await Genre.findOne({
            where: {
            name: el,
            },
        });
        await newGame.addGenre(genreGameDb);
        });

        await Promise.all(genrePromises);
    }

    if(!newGame) {
        throw new Error('Error, no se creó el juego!');
    }

    const gameCreated = await Videogame.findOne({
        where: {
        id: newGame.id,
        },
        include: {
        model: Genre,
        attributes: ['id','name'],
        through: {
            attributes: [],
        },
        },
    });

    return gameCreated;
    } catch (error) {
    console.log(error);
    return { error: error.message };
    }
};

//!/************************************************************************ */

const editG = async (game, id) => {
    try {
    const { name, description, platforms, genres } = game;

    const editedGame = await Videogame.update(
        {
        name: name,
        description: description,
        platforms: platforms,
        },
        {
        where: {
            id: id,
        },
        }
    );

    if (!editedGame[0]) {
        throw new Error('No se encuentra el juego.');
    }

    const gameUpdated = await Videogame.findOne({
        where: {
        id: id,
        },
        include: [
        {
            model: Genre,
            attributes: ['id', 'name'],
            through: {
            attributes: [],
            },
        },
        ],
    });

      // Buscar los géneros en la base de datos por su nombre
    const foundGenres = await Genre.findAll({
        where: {
        name: genres,
        },
    });

      // Limpiar los géneros actuales del juego
    await gameUpdated.setGenres([]);

      // Asignar los géneros encontrados al juego actualizado
    await gameUpdated.addGenres(foundGenres);

    return {
        message: 'Juego modificado',
        result: gameUpdated,
    };
    } catch (error) {
    return { error: error.message };
    }
};
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
    return (`${findGame.name} fue eliminado con exito.`)
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