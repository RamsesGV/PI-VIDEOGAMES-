//!Esta línea carga las variables de entorno desde el archivo .env en el proyecto.
require('dotenv').config()
/*
Aquí se importa la clase Sequelize del paquete sequelize
que es una biblioteca de ORM (Object-Relational Mapping) 
para interactuar con bases de datos relacionales.
 */
const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')

/*
Aquí se importan los archivos que contienen las definiciones de los modelos Videogame y Genre.
Estos modelos representarán las tablas en la base de datos.
 */
const videoGameModel = require('./models/Videogame.js')
const genreModel = require('./models/Genre.js')

//!Esta línea desestructura las variables de entorno necesarias para establecer la conexión a la base de datos.
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

/*
Aquí se crea una instancia de la clase Sequelize
y se establece la configuración de la conexión a la base de datos PostgreSQL. 
Los valores de las variables de entorno se utilizan para construir la URL de conexión. 
También se configuran algunas opciones adicionales, 
como el registro de consultas SQL (logging: false) y el uso de la biblioteca pg-native 
(native: false).
 */
const sequelize = new Sequelize(
  
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, // => localhost
  {
  host: `${DB_HOST}`,
  dialect: 'postgres',
   	logging: false, // set to console.log to see the raw SQL queries
  	native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
  
  
)
const basename = path.basename(__filename)

const modelDefiners = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize))
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models)
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
])
sequelize.models = Object.fromEntries(capsEntries)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
/*
Estas líneas capitalizan el nombre de cada modelo en sequelize.models. 
Se obtienen las entradas del objeto sequelize.models, 
se capitaliza el primer carácter de cada nombre 
y se crea un nuevo objeto sequelize.models con los nombres capitalizados.
 */

const { Videogame, Genre } = sequelize.models
/* 
Aquí se realizan las asignaciones destructurantes de los modelos Videogame y Genre 
desde sequelize.models para facilitar su uso posterior.
*/

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

videoGameModel(sequelize)
genreModel(sequelize)
/*
Estas líneas llaman a las funciones videoGameModel y genreModel 
pasando la instancia de sequelize como argumento. 
Estas funciones definen las asociaciones y configuraciones adicionales de los modelos
 */

Videogame.belongsToMany(Genre, {
  through: 'game_genres', timestamps: false
})
Genre.belongsToMany(Videogame, {
  through: 'game_genres', timestamps: false
})
/**
Estas líneas establecen las relaciones entre los modelos Videogame y Genre.
Estas relaciones indican que un juego puede pertenecer a varios géneros
y un género puede tener varios juegos. 
Se utiliza una tabla intermedia llamada 'game_genres' para almacenar las asociaciones. 
El parámetro timestamps: false se utiliza para desactivar el registro automático de marcas de tiempo en las asociaciones.

 */

/*
Esta línea exporta los modelos definidos en sequelize.models
y la conexión sequelize como un objeto para que puedan ser importados en otros archivos.
 */
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
}
