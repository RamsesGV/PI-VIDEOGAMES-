import axios from 'axios'
//!TYPES!
const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'; //home
const GET_VIDEOGAMES_BY_ORIGIN = 'GET_VIDEOGAMES_BY_ORIGIN'; //JUEGOS DE LA DB
const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME'; //BUSCA POR NOMBRE DE VIDEOGAME
const GET_VIDEOGAME_BY_ID = 'GET_VIDEOGAME_BY_ID';
const GET_GENRES = 'GET_GENRES';
const ORDER_ALPHABETICALLY = 'ORDER_ALPHABETICALLY'; // ORDEN ALFABETICO
const FILTER_BY_GENRES = 'FILTER_BY_GENRES';
const ORDER_BY_RAITING = 'ORDER_BY_RAITING'; //MAS POPULARES
//const CREATED_GAMES = 'CREATED_GAMES'; // JUEGOS DE LA DB
//const CREATE_GAME = 'CREATE_GAME' // POST - FORMULARIO
//const MODIFY_GAME = 'MODIFY_GAME'; //PUT - FORMULARIO 
const DELETED_GAME = 'DELETED_GAME';
const DELETE_STATES = 'DELETE_STATES'


export const getAllVideoGames = () => { 
    return async function(dispatch) {
        let response = await axios.get('http://localhost:3001/videogames')
        return dispatch({
            type:GET_ALL_VIDEOGAMES,
            payload:response.data
        })
    }
}

export const getDetailVideoGame = (id) => { 
    return async function(dispatch) { 
        try {
            let response = axios.get(`http://localhost:3001/videogames/${id}`)
                return dispatch({
                    type:GET_VIDEOGAME_BY_ID,
                    payload:response.data
        })
        } catch (error) {
            return { 
                error:'there is no detail.',
                appError:error,
            }
        }
        
    }
}

export const createVideoGame = (payload) => { 
    return async function() { 
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

export const getGenres = (payload) => { 
return async function(dispatch) { 
try {
    let response = axios.get(`http://localhost:3001/genres`, payload)
    return dispatch({
        type:GET_GENRES,
        payload:response.data
    })
} catch (error) {
    return{
        error:"Can't Get Genres",
        appError:error
    }
}
}
}

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

export const getVideogameByName = (name) => { 
    return async function(dispatch){
        try {
            let response = axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type:GET_VIDEOGAMES_BY_NAME,
                payload:(await response).data,
            })
        } catch (error) {
            return{
                error:'No games found with that name.',
                appError:error
            }
        }
    }
}

export const deleteVideogame = (id) => { 
    return async function(dispatch) { 
        try {
            let response = await axios.delete(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                type:DELETED_GAME,
                payload:response.data
            })
        } catch (error) {
            return{
                error:'The game could not be deleted',
                appError:error
            }
        }
    }
}


export const deleteStates = () => {
    return async function (dispatch) {
        return dispatch({
            type: DELETE_STATES,
        })
    }
}

//export const searchGameByPlatforms = () => { }
//export const modifyVideoGame = (payload) => { }   