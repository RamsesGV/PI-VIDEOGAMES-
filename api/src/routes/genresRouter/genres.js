const { Router } = require('express')
const router = Router()
const {getGenres} = require('../../controllers/genresController.js')

router.get('/', async (req, res) => {
const genres = await getGenres()
try {
    res.status(200).json(genres)
} catch (error) {
    res.status(404).send(error.message)
}
})

module.exports = router


/*
Se importa el módulo Router del paquete express 
para poder configurar las rutas.
Se crea una instancia del enrutador utilizando Router().
Se importa la función getGenres del controlador genresController.js.
Se configura una ruta GET en el enrutador utilizando el método get(). 
En este caso, la ruta es '/', 
lo que significa que se asocia a la ruta base del router.
Dentro del manejador de la ruta, 
se llama a la función getGenres para obtener los géneros.
Se utiliza un bloque try-catch 
para manejar cualquier error que pueda ocurrir durante la obtención de los géneros.
Si todo está bien, 
se envía una respuesta con el código de estado 200 
y se devuelve un objeto JSON con los géneros.
Si hay un error, 
se envía una respuesta con el código de estado 404 
y se devuelve el mensaje de error.
Finalmente, 
se exporta el enrutador para que pueda ser utilizado en otros archivos.
 */