//import { getAllVideoGames } from "./actions"

const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'; //home
const GET_VIDEOGAMES_BY_ORIGIN = 'GET_VIDEOGAMES_BY_ORIGIN'; //JUEGOS DE LA DB
const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME'; //BUSCA POR NOMBRE DE VIDEOGAME
const GET_VIDEOGAME_BY_ID = 'GET_VIDEOGAME_BY_ID';
const GET_GENRES = 'GET_GENRES';
const ORDER_ALPHABETICALLY = 'ORDER_ALPHABETICALLY'; // ORDEN ALFABETICO
const FILTER_BY_GENRES = 'FILTER_BY_GENRES';
const ORDER_BY_RAITING = 'ORDER_BY_RAITING'; //MAS POPULARES
const DELETED_GAME = 'DELETED_GAME';
const DELETE_STATES = 'DELETE_STATES'
const CREATE_GAME = 'CREATE_GAME'

const initialState = {
    videogames:[],
    getAllVideoGames:[],
    getAllVideoGames2:[],
    genres:[],
    details:[],
}

const  rootReducer = (state = initialState, action) => { 
    const {
        type,
        payload
    } = action;

    switch(type) { 

        case GET_ALL_VIDEOGAMES:
            if(state.videogames.length > 0) { 
                return{
                    videogames:state.videogames,
                    getAllVideoGames:state.getAllVideoGames,
                }
            }
            return{
                ...state,
                getAllVideoGames:payload,
                videogames:payload,
                details:[],
            }



            case GET_VIDEOGAME_BY_ID:
                return{
                    ...state,
                    details:payload,
                };



            case CREATE_GAME:
                return{
                    ...state
                };



            case GET_GENRES:
                return{
                    ...state,
                    details:[],
                    genres:payload
                };



                case ORDER_ALPHABETICALLY:
                    const sortedArr = payload === 'asc' ?
                    state.videogames.sort((a, b) => {
                        let nameA = a.name.toLowerCase();
                        let nameB = b.name.toLowerCase();
                        if (nameA > nameB) {
                            return 1
                        }
                        if (nameB > nameA) {
                            return -1
                        } else {
                            return 0
                        }
                    }) :
                    state.videogames.sort((a, b) => {
                        let nameA = a.name.toLowerCase();
                        let nameB = b.name.toLowerCase();
                        if (nameA > nameB) {
                            return -1
                        }
                        if (nameB > nameA) {
                            return 1
                        } else {
                            return 0
                        }
                    });
                return {
                    ...state,
                    videogames: sortedArr,
                    getAllVideoGames: sortedArr,
                    getAllVideoGames2: sortedArr,
                };



                case ORDER_BY_RAITING:
                    const ratingFiltered = payload === 'max' ?
                state.videogames.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return 1
                    }
                    if (b.rating < a.rating) {
                        return -1
                    } else {
                        return 0
                    }
                }) :
                state.videogames.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return -1
                    }
                    if (b.rating < a.rating) {
                        return 1
                    } else {
                        return 0
                    }
                });
            return {
                ...state,
                getAllVideoGames: ratingFiltered,
                videogames: ratingFiltered,
                getAllVideoGames2: ratingFiltered,
            };
            //! hasta qui hice yo. lo terminaremos ramses! 

            case FILTER_BY_GENRES:
                const allVideoGames = state.getAllVideoGames;
                const filteredArr = allVideoGames.filter(el => el.genres.includes(payload));
            
                // Eliminar duplicados basados en el nombre
                const uniqueGames = Array.from(new Set(filteredArr.map(el => el.name)))
                .map(name => filteredArr.find(el => el.name === name));
            
                return {
                ...state,
                getAllVideoGames: state.getAllVideoGames,
                videogames: uniqueGames,
                };
            


            case GET_VIDEOGAMES_BY_ORIGIN:
            let filterMyGames;
            if (payload === 'Created') {
                filterMyGames = state.getAllVideoGames.filter(el => el.createdInDb === true)
                return {
                    ...state,
                    videogames: filterMyGames
                }
            } else if (payload === 'From Api') {
                filterMyGames = state.getAllVideoGames.filter(el => !el.createdInDb)
                return {
                    ...state,
                    videogames: filterMyGames
                }
            } else if (payload === 'All') {
                filterMyGames = state.getAllVideoGames
                return {
                    ...state,
                    videogames: filterMyGames
                }
            };
                break;

            case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                videogames: payload
            };


            case DELETED_GAME:
                return {
                ...state,
                videogames: payload
            };


            case DELETE_STATES:
            return {
                videogames: [],
                getAllVideoGames: [],
                genres: [],
                details: [],
            };





            default:
            return state
    }
}

export default rootReducer