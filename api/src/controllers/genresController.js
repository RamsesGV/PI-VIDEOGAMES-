const axios = require('axios') //! importa el módulo axios para hacer solicitudes HTTP.
const { Genre } = require('../db.js') //! importa el modelo Genre del archivo db.js que contiene el modelo de género.

const getGenres = async () => { //Esta línea define una función asincrónica llamada getGenres.
/* 
Esta línea utiliza axios.get()
para realizar una solicitud HTTP GET a la URL especificada 
y asigna la respuesta a la variable response.
*/  
const response = await axios.get(`https://api.rawg.io/api/genres?key=975089cbd48846a78452db953dd911fd`,)
try {
    /*
    Esta línea utiliza la propiedad results 
    de la respuesta para obtener un arreglo de géneros
    y luego utiliza map() para extraer solo los nombres de los géneros. 
    Los nombres se asignan a la variable genres.
     */
    let genres = response.data.results.map((el) => el.name)
    /*
    Estas líneas recorren el arreglo genres utilizando forEach(). 
    Para cada género, se utiliza Genre.findOrCreate() para buscar o crear un género en la base de datos. 
    Se proporciona un objeto con el campo name que contiene el nombre del género.
     */
    genres.forEach((el) => {
    Genre.findOrCreate({
        where: {
        name: el,
        },
    });
    })
    //! Esta línea devuelve el arreglo genres que contiene los nombres de los géneros.
    return genres;

    /* 
    Estas líneas manejan las excepciones. 
    Si ocurre un error durante el proceso, 
    se lanza una excepción con un objeto que contiene un mensaje de error.
    */ 
} catch (error) {
    throw new Error({
    error:
        'No se encontraron géneros'
    })
}
}


/* 
Estas líneas cierran la función getGenres 
y exportan la función como un objeto 
para que pueda ser utilizada en otros archivos.

*/
module.exports = { getGenres };
