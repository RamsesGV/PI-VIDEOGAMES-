
import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    CREATE_GAME,
    GET_GENRES,
    ORDER_ALPHABETICALLY,
    ORDER_BY_RAITING,
    FILTER_BY_GENRES,
    GET_VIDEOGAMES_BY_ORIGIN,
    GET_VIDEOGAMES_BY_NAME,
    DELETED_GAME,
    DELETE_STATES,
   // MODIFY_GAME
} from '../actions/types.js';

/*
Se define el estado inicial que contiene los campos videogames, 
getAllVideoGames, 
getAllVideoGames2, genres y details.
 */
const initialState = {
    videogames: [], // este estado se llama ni bien se ejecuta la app
    getAllVideoGames: [], //LA COPIA DONDE FILTRO PARA PISAR VIDEOGAMES Y MOSTRAR
    getAllVideoGames2: [],
    genres: [], // este estado se llama ni bien se ejecuta la app
    details: [],
};

//const generateNewId = () => {
   // return Date.now().toString();
//};

/*
El reducer se encarga de manejar las acciones 
y actualizar el estado en función del tipo de acción recibida.
Cada caso dentro del switch maneja un tipo de acción específico 
y actualiza el estado correspondientemente.
 */
function rootReducer(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        /*
        Por ejemplo, en el caso GET_ALL_VIDEOGAMES, 
        se verifica si ya existen juegos de video 
        (state.videogames.length > 0). Si existen, 
        se retorna el estado actual sin hacer cambios. 
        De lo contrario, se actualizan los campos 
        getAllVideoGames, videogames y details con los datos recibidos 
        en payload.
         */
        case GET_ALL_VIDEOGAMES:
            if (state.videogames.length > 0) {
                return {
                    videogames: state.videogames,
                    getAllVideoGames: state.getAllVideoGames
                }
            }
            return {
                ...state,
                getAllVideoGames: payload,
                videogames: payload,
                details: [],
            };

            /*
            Descripción: Esta acción se utiliza para obtener un videojuego específico 
            por su ID.
            Propósito: Actualizar el estado con los detalles del videojuego seleccionado.
            Resultado: El estado se actualiza con los detalles del videojuego 
            obtenidos en el campo payload del estado.
             */
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                details: payload,
            };

            /*
            Descripción: Esta acción se utiliza para crear un nuevo videojuego.
            Propósito: No realiza cambios en el estado, solo indica que se ha creado un nuevo videojuego.
            Resultado: No se realizan cambios en el estado.
             */
        case CREATE_GAME:
            return {
                ...state,
            };

          //  case MODIFY_GAME: {
              //  const { id, data } = action.payload;
       //   
                // Verificar si el ID existe para determinar si es una actualización o creación
              //  if (id) {
                  // Actualización del videojuego existente
                //  const updatedVideoGames = state.videogames.map((game) =>
                 //   game.id === id ? { ...game, ...data } : game
                //  );
                //  return {
                  //  ...state,
                 //   videoGames: updatedVideoGames,
                //  };
               // } else {
                  // Creación de un nuevo videojuego
               //   const newVideoGame = {
                  //  id: generateNewId(), // Generar un nuevo ID (puedes utilizar una función adecuada para generar IDs únicos)
                //    ...data,
                //  };
                //  return {
                 //   ...state,
                  //  videoGames: [...state.videogames, newVideoGame],
                 // };
               // }
            
            
            //};
        
        


            /*
            Descripción: Esta acción se utiliza para obtener todos los géneros de videojuegos disponibles.
            Propósito: Actualizar el estado con la lista de géneros de videojuegos.
            Resultado: El estado se actualiza con la lista de géneros obtenidos en el campo payload del estado, y el campo details se vacía.
             */
        case GET_GENRES:
            return {
                ...state,
                details: [],
                genres: payload,
            };

            /*
            Descripción: Esta acción se utiliza para ordenar los videojuegos alfabéticamente 
            ascendente o descendente.
            Propósito: Actualizar el estado con la lista de videojuegos ordenados.
            Resultado: El estado se actualiza con la lista de videojuegos ordenados 
            alfabéticamente según la dirección especificada en el campo payload. 
            Los campos getAllVideoGames, videogames y getAllVideoGames2 se actualizan con la lista ordenada.
             */
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

            /*
            Descripción: Esta acción se utiliza para ordenar los videojuegos por calificación 
            máxima o mínima.
            Propósito: Actualizar el estado con la lista de videojuegos ordenados por 
            calificación.
            Resultado: El estado se actualiza con la lista de videojuegos ordenados 
            por calificación según la dirección especificada en el campo payload. 
            Los campos getAllVideoGames, videogames y getAllVideoGames2 se actualizan con la lista ordenada.
             */
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


            /*
            Descripción: Esta acción se utiliza para filtrar los videojuegos por género.
            Propósito: Actualizar el estado con la lista de videojuegos filtrados por género.
            Resultado: El estado se actualiza con la lista de videojuegos filtrados 
            por el género especificado en el campo payload. 
            Los campos getAllVideoGames y videogames se actualizan con la lista filtrada.
             */
        case FILTER_BY_GENRES:
            const allVideoGames = state.getAllVideoGames;
            const filteredArr =
                allVideoGames.filter(el => el.genres.includes(payload))
            return {
                ...state,
                getAllVideoGames: state.getAllVideoGames,
                videogames: filteredArr
            };


            /*
            Descripción: Esta acción se utiliza para obtener los videojuegos según su origen 
            (creados o provenientes de una API externa).
            Propósito: Actualizar el estado con la lista de videojuegos según 
            el origen especificado.
            Resultado: El estado se actualiza con la lista de videojuegos filtrados 
            según el origen especificado en el campo payload. 
            El campo videogames se actualiza con la lista filtrada.
             */
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


            /*
            Descripción: Esta acción se utiliza para obtener los videojuegos según su nombre.
            Propósito: Actualizar el estado con la lista de videojuegos filtrados por nombre.
            Resultado: El estado se actualiza con la lista de videojuegos filtrados 
            según el nombre especificado en el campo payload. 
            El campo videogames se actualiza con la lista filtrada.
             */
        case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                videogames: payload
            };


            /*
            Descripción: Esta acción se utiliza para eliminar un videojuego.
            Propósito: Actualizar el estado eliminando el videojuego especificado.
            Resultado: El estado se actualiza eliminando 
            el videojuego especificado en el campo payload del estado.
             */
        case DELETED_GAME:

            return {
                ...state,
                videogames: payload
            };


            /*
            Descripción: Esta acción se utiliza para restablecer el estado a su valor inicial.
            Propósito: Restablecer el estado eliminando todos los datos 
            de videojuegos, géneros y detalles.
            Resultado: El estado se restablece a su valor inicial, es decir, 
            los campos videogames, getAllVideoGames, genres y details se vacían.
             */
        case DELETE_STATES:
            return {
                videogames: [],
                getAllVideoGames: [],
                genres: [],
                details: [],
            };


        default:
            return state;
    }


}



export default rootReducer;