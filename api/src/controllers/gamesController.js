/*
importa el módulo axios para realizar solicitudes HTTP.
importa los modelos Videogame y Genre del archivo db.js.
 */
const axios = require('axios')
const { Videogame, Genre } = require('../db.js')

//!-----------------------------------------------------------------------------
/*
Esta función asincrónica llamada getGamesOnDb 
busca y devuelve todos los juegos almacenados en la base de datos. 
Utiliza el método findAll() del modelo Videogame 
y realiza una inclusión del modelo Genre para obtener los géneros asociados a cada juego. 
Si no se encuentran juegos en la base de datos, se lanza un error. 
De lo contrario, se devuelve un arreglo de juegos.
 */
const getGamesOnDb = async () => {
const gamesOnDb = await Videogame.findAll({
    include: {
    model: Genre,
    attributes: ['name'],
    through: {
        attributes: [],
    },
    },
})
if (gamesOnDb.lenght === 0) {
    throw new Error('No se encontraron juegos en la Db')
}
return gamesOnDb
}
//!-----------------------------------------------------------------------------------

//!----------------------------------------------------------------------------------------
// 100 juego de api
/*
La función getGamesOnApi realiza solicitudes a la API para obtener juegos. 
Utiliza axios.get() para obtener los juegos de la URL especificada. 
La solicitud inicial obtiene 20 juegos, 
y luego se hace el mismo endpoint 5 veces más para obtener un total de 100 juegos. 
Los juegos se almacenan en el arreglo result.

A continuación, se realiza un mapeo de los datos para extraer 
y estructurar la información relevante de cada juego. 
Se crea un objeto para cada juego que incluye sus propiedades como 
id, name, description, released, rating, img (imagen de fondo), platforms (plataformas) y genres (géneros).
Finalmente, se devuelve un arreglo de juegos estructurados.
 */

const getGamesOnApi = async () => {


let response = await axios.get(
    `https://api.rawg.io/api/games?key=975089cbd48846a78452db953dd911fd`,
)


let result = [];
for (let i = 0; i < 5; i++) {
    result = [...result, ...response.data.results];
    response = await axios.get(response.data.next);
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

//!---------------------------------------------------------------------------------------------------
/*
La función getAllGames obtiene todos los juegos tanto de la API como de la base de datos. 
Utiliza las funciones getGamesOnApi() y getGamesOnDb() 
para obtener los juegos respectivamente. 
Luego, combina los resultados de ambas fuentes y los devuelve en un arreglo.
*/ 
const getAllGames = async () => {
const apiData = await getGamesOnApi()
const dbData = await getGamesOnDb()
return [...apiData, ...dbData]
}

//!------------------------------------------------------------------------------------------------------

/*
La función getGameByName recibe un parámetro name 
que representa el nombre del juego que se desea buscar. 
Realiza una solicitud a la API utilizando axios.get() 
y agrega el parámetro search para filtrar los juegos por nombre. 
Luego, se obtienen los juegos de la base de datos utilizando la función getGamesOnDb(). 
Se combinan los juegos de ambas fuentes en el arreglo allGames.

A continuación, se filtran los juegos que coinciden con el nombre proporcionado, 
ignorando mayúsculas y minúsculas. 
Los juegos filtrados se almacenan en el arreglo gamesNames.

Se realiza un mapeo de los juegos filtrados 
para extraer y estructurar la información relevante de cada juego, 
similar a la función getGamesOnApi(). 
Se crea un objeto para cada juego que incluye sus propiedades 
como id, name, description, released, rating, img (imagen de fondo), platforms (plataformas) y genres (géneros).
Si no se encuentran juegos que coincidan con el nombre proporcionado, 
se lanza un error. 
De lo contrario, se devuelve un arreglo de juegos estructurados.
*/ 

const getGameByName = async (name) => {
let apiGames = await axios.get(
    `https://api.rawg.io/api/games?key=975089cbd48846a78452db953dd911fd&search=${name}`,
)
const dbGames = await getGamesOnDb();
let allGames = [
    ...apiGames.data.results,
    ...dbGames
];

let gamesNames = allGames.filter((el) =>
    el.name.toLowerCase().includes(name.toLowerCase()),
)

const data = gamesNames.map((el) => {
    return {
    id: el.id,
    name: el.name,
    description: el.description,
    released: el.released,
    rating: el.rating,
    img: el.createdInDb ? el.image : el.background_image,
    platforms: el.createdInDb ?
        el.platforms :
        el.platforms.map((p) => p.platform.name),
    genres: el.genres.map((g) => g.name),
    }
})
if (data.length === 0) {
    throw new Error(`No se encontraron datos`)
}
return data;
}

//!--------------------------------------------------------------------------------------------------------

/*
La función getGameById recibe un parámetro id 
que representa el identificador del juego que se desea buscar. 
Si el id es un número, 
se realiza una solicitud a la API utilizando axios.get() 
para obtener el juego por su id específico. 
Se obtiene la información del juego 
y se estructura en un objeto similar a las funciones anteriores.

Si el id no es un número, 
se asume que es un id válido de la base de datos 
y se busca el juego utilizando el modelo Videogame y la función findOne(). 
También se incluye el modelo Genre para obtener los géneros asociados al juego. 
Si no se encuentra el juego en la base de datos, se lanza un error.
En ambos casos, 
si no se encuentra el juego, 
se lanza un error. De lo contrario, se devuelve el juego encontrado.
 */

const getGameById = async (id) => {
if (isNaN(id)) {
    let idByDB = await Videogame.findOne({
    where: {
        id: id,
    },
    include: {
        model: Genre,
        attributes: ['name'],
        through: {
        attributes: [],
        },
    }
    });
    if (!idByDB) {
    throw new Error('No se encontró el juego con el id solicitado')
    }
    return idByDB;
}
else {

    const findById = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=975089cbd48846a78452db953dd911fd`,
    )
    if (!findById) {
    throw new Error('No se encontró el juego con el id solicitado')
    }
    return {
    id: findById.data.id,
    name: findById.data.name,
    description: findById.data.description,
    released: findById.data.released,
    rating: findById.data.rating,
    img: findById.data.background_image,
    platforms: findById.data.platforms.map((p) => p.platform.name),
    genres: findById.data.genres.map((g) => g.name),
    }
}
}

//!--------------------------------------------------------------------------------------------------------

/*
La función createGame recibe un objeto game que representa los datos del juego a crear. 
Se intenta crear un nuevo juego utilizando el modelo Videogame y el método create(). 
El juego se guarda en la base de datos.
A continuación, 
se asocian los géneros del juego utilizando el método addGenre() y el modelo Genre. 
Para cada género proporcionado en genres, 
se busca el género correspondiente en la base de datos y se asocia al nuevo juego.
Si no se puede crear el juego, 
se lanza un error. 
De lo contrario, 
se busca el juego recién creado en la base de datos utilizando el id del juego 
y se incluye el modelo Genre para obtener los géneros asociados.
Finalmente, se devuelve el juego creado.
 */

const createGame = async (game) => {
try {
    const { genres } = game;
    const newGame = await Videogame.create(game)
    genres.map(async (el) => {
    let genreGameDB = await Genre.findOne({
        where: {
        name: el,
        },
    });
    await newGame.addGenre(genreGameDB);
    })
    if (!newGame) {
    throw new Error('Error interno, no se pudo crear el juego')
    }
    const gameCreated = await Videogame.findOne({
    where: {
        id: newGame.id,
    },
    include: {
        model: Genre,
        attributes: [],
        through: {
        attributes: [],
        },
    },
    })
    return gameCreated;
} catch (error) {
    return error
}
}

//!----------------------------------------------------------------------------------------------------

//*----------------------------------------------------------------------------------------------------------------


/*
La función editGame recibe un objeto game que contiene los datos actualizados del juego 
y el id del juego que se desea editar.
Se desestructuran las propiedades relevantes del objeto game.
Se utiliza el método update() del modelo Videogame para actualizar los campos name, 
description y platforms del juego en la base de datos. 
Se busca el juego por su id y se realiza la actualización.
Si no se puede encontrar el juego a editar, 
se lanza un error. De lo contrario, 
se busca el juego actualizado en la base de datos utilizando el id del juego.
A continuación, se asocian los géneros actualizados al juego. 
Para cada género proporcionado en genres, 
se busca el género correspondiente en la base de datos. 
Se elimina cualquier asociación previa del juego con los géneros utilizando 
gameFinded.setGenres([]) y luego se asocia el juego con los géneros actualizados utilizando 
gameUpdated.addGenre(genreFinded).
Finalmente, 
se devuelve el juego actualizado.
 */

const editGame = async (game, id) => {
try {
    const { name, description, platforms, genres } = game;
    const editedGame = await Videogame.update({
    name: name,
    description: description,
    platforms: platforms,
    },
    {
        where: {
        id: id,

        },
    })
    if (!editedGame) {
    throw new Error('No se encuentra el juego solicitado')
    }

    const gameUpdated = await Videogame.findOne({
    where: {
        id: id,
    }
    })

    await genres.forEach(async (el) => {
    let genreFinded = await Genre.findOne({
        where: {
        name: el,
        },
    });
    const gameFinded = await Videogame.findOne({
        where: {
        id: id,
        },
        include: [Genre],
    })
    await gameFinded.setGenres([])
    await gameUpdated.addGenre(genreFinded);
    })

    return {
    message: 'Juego modificado con éxito!',
    result: gameUpdated
    }
} catch (error) {
    throw new Error('No se pudo modificar el juego')
}

}

//*-------------------------------------------------------------------------------------------------------------


//!---------------------------------------------------------------------------------------------------------------------

/*
La función deleteGame recibe el id del juego que se desea eliminar. 
Se busca el juego en la base de datos utilizando el id 
y se almacena en la variable gameToDelete.
Si no se encuentra el juego a eliminar, se lanza un error. 
De lo contrario, se eliminan todas las asociaciones del juego 
con los géneros utilizando gameToDelete.removeGenres().
A continuación, 
se utiliza el método destroy() del modelo Videogame para eliminar el juego de la base de datos. 
Se busca el juego por su id y se realiza la eliminación.
Si no se puede eliminar el juego, 
se lanza un error. De lo contrario, 
se devuelve un mensaje indicando que el juego fue eliminado correctamente.
 */

const deleteGame = async (id) => {

const findGame = await Videogame.findOne({
    where: {
    id: id
    },
})
if (!findGame) {
    throw new Error('No se pudo encontrar el juego')
} else {
    await findGame.destroy()
}
return findGame;
}

//!--------------------------------------------------------------------------------------------------------------------------------

module.exports = {
getGamesOnApi,
getGamesOnDb,
getAllGames,
getGameByName,
getGameById,
createGame,
editGame,
deleteGame
}
