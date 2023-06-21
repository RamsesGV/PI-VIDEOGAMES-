//ACTIONS

/*
En esta sección, 
se importa el módulo axios para realizar las solicitudes HTTP 
y se importan las constantes utilizadas como tipos de acción en el flujo de Redux.
 */ 
import axios from 'axios';
import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    GET_GENRES,
    ORDER_ALPHABETICALLY,
    ORDER_BY_RAITING,
    FILTER_BY_GENRES,
    GET_VIDEOGAMES_BY_ORIGIN,
    GET_VIDEOGAMES_BY_NAME,
    DELETED_GAME,
    DELETE_STATES,
   // MODIFY_GAME
} from './types.js'

/*
Esta es una acción asincrónica (async) 
que obtiene todos los videojuegos. 
Dentro de la función, 
se realiza una solicitud GET a la URL http://localhost:3001/videogames 
utilizando axios.get(). 
El resultado se envía al almacenamiento Redux a través de dispatch con el tipo 
de acción GET_ALL_VIDEOGAMES y los datos de respuesta como carga (payload).
 */
export const getAllVideoGames = () => {
    return async function (dispatch) {
        let response = await axios.get(`http://localhost:3001/videogames`, {})
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: response.data
        })
    }
}


/*
Esta acción asincrónica obtiene los detalles de un videojuego específico según su ID. 
Se realiza una solicitud GET a la URL http://localhost:3001/videogames/${id}. 
Si la solicitud es exitosa, 
se envían los detalles del videojuego al almacenamiento Redux 
con el tipo de acción GET_VIDEOGAME_BY_ID y los datos de respuesta como carga. 
En caso de error, se devuelve un objeto con información de error
 */
export const getDetailVideoGame = (id) => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: GET_VIDEOGAME_BY_ID,
                payload: response.data
            })
        } catch (error) {
            return {
                error: 'No hay detalles para mostrar',
                originalError: error,
            }
        }
    }
}

/*
Esta acción asincrónica crea un nuevo videojuego. 
Se realiza una solicitud POST a la URL http://localhost:3001/videogames 
con los datos del videojuego proporcionados en el objeto payload. 
Si la solicitud es exitosa, 
se devuelve la respuesta. En caso de error, 
se devuelve un objeto con información de error
 */
export const createVideoGame = (payload) => {
    return async function () {
        try {
            let {
                name,
                image,
                description,
                released,
                rating,
                platforms,
                genres
            } = payload;
            let response = await axios.post(`http://localhost:3001/videogames`, {
                name,
                image,
                description,
                releaseDate: new Date(released),
                rating,
                platforms,
                genres,
            })
            return response;
        } catch (error) {
            return {
                error: "Can't Create Videogame",
                originalError: error
            }
        }
    }
}


/*
Esta acción asincrónica obtiene los géneros de videojuegos disponibles. 
Se realiza una solicitud GET a la URL http://localhost:3001/genres. 
Si la solicitud es exitosa, 
se envían los géneros al almacenamiento Redux con el tipo de acción GET_GENRES 
y los datos de respuesta como carga. En caso de error, 
se devuelve un objeto con información de error.
 */
export const getGenres = (payload) => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/genres`, payload)
            return dispatch({
                type: GET_GENRES,
                payload: response.data
            });
        } catch (error) {
            return {
                error: "Can't Get Genres",
                originalError: error
            }
        }
    }
}


/*
Estas acciones son acciones síncronas que ordenan los videojuegos alfabéticamente, 
por clasificación o por género. 
Cada acción devuelve un objeto con el tipo de acción correspondiente 
y los datos proporcionados como carga (payload).
 */
export const orderAlphabetically = (payload) => {
    return {
        type: ORDER_ALPHABETICALLY,
        payload
    }
}



export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RAITING,
        payload
    }
}

export const filterByGenres = (payload) => {
    return {
        type: FILTER_BY_GENRES,
        payload
    }
}

export const getVideoGamesByOrigin = (payload) => {
    return {
        type: GET_VIDEOGAMES_BY_ORIGIN,
        payload
    }
}


/*
Esta acción asincrónica obtiene los videojuegos por su nombre. 
Se realiza una solicitud GET a la URL http://localhost:3001/videogames?name=${name} 
con el nombre proporcionado como parámetro de consulta. 
Si la solicitud es exitosa, 
se envían los videojuegos encontrados al almacenamiento Redux con el tipo de acción 
GET_VIDEOGAMES_BY_NAME y los datos de respuesta como carga. 
En caso de error, se devuelve un objeto con información de error.
 */
export const getVideogameByName = (name) => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: GET_VIDEOGAMES_BY_NAME,
                payload: response.data
            })
        } catch (err) {
            return {
                error: "No games found with that name.",
                originalError: err
            }
        }
    }
}


/*
Esta acción asincrónica elimina un videojuego según su ID. 
Se realiza una solicitud DELETE a la URL http://localhost:3001/videogames/${id}. 
Si la solicitud es exitosa, se envía la respuesta al almacenamiento Redux 
con el tipo de acción DELETED_GAME y los datos de  respuesta como carga. 
En caso de error, se devuelve un objeto con información de error.
 */
export const deleteVideoGame = (id) => {
    return async function (dispatch) {
        try {
            console.log(id)
            let response = await axios.delete(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                type: DELETED_GAME,
                payload: response.data
            })
        } catch (error) {
            return {
                error: 'No se pudo eliminar el juego',
                originalError: error
            }
        }
    }
}


/*
Esta acción asincrónica borra los estados. 
Envía una acción al almacenamiento Redux con el tipo de acción DELETE_STATES.
 */
export const deleteStates = () => {
    return async function (dispatch) {
        return dispatch({
            type: DELETE_STATES,
        })
    }
}

export const searchGameByPlatforms = () => { }

//export const modifyVideoGame = (id,payload) => {
   // return {
      //  type: MODIFY_GAME,
      ///  payload: {
       /// id,
       // data: payload,
       // },
   // };
//}

