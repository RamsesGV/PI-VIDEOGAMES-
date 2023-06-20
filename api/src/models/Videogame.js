/* 
En esta línea, 
se importan las clases DataTypes y STRING del paquete sequelize. 
Estas clases se utilizan para definir los tipos de datos de los campos en el modelo.
aunque STRING fue un accidente. xd
*/
const { DataTypes, STRING } = require('sequelize')

/* 
Aquí se exporta una función que define el modelo y recibe la instancia de sequelize como parámetro. 
Esto permite inyectar la conexión a Sequelize en el modelo.
*/ 
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'videogame',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      releaseDate: {
        type: DataTypes.DATE,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  )
}
/* 
En este bloque, se define el modelo 'videogame' utilizando el método define() de la instancia de sequelize. 
Se definen los campos y sus atributos correspondientes.

id: Es un campo de tipo UUID (identificador único universal) que se genera automáticamente 
(defaultValue: DataTypes.UUIDV4). Es una clave primaria (primaryKey: true) 
y no puede ser nulo (allowNull: false).

createdInDb: Es un campo de tipo booleano (DataTypes.BOOLEAN) 
que indica si el juego fue creado en la base de datos. 
No puede ser nulo y tiene un valor predeterminado de true.

name: Es un campo de tipo cadena (DataTypes.STRING) 
que representa el nombre del videojuego. No puede ser nulo.

image: Es un campo de tipo cadena que representa la URL de la imagen del videojuego.
No puede ser nulo.

description: Es un campo de tipo texto (DataTypes.TEXT) que almacena la descripción del videojuego. 
No puede ser nulo.

releaseDate: Es un campo de tipo fecha (DataTypes.DATE) que representa la fecha de lanzamiento del videojuego. 
Puede ser nulo.

rating: Es un campo de tipo flotante (DataTypes.FLOAT) que representa la calificación del videojuego. 
Puede ser nulo.

platforms: Es un campo de tipo arreglo (DataTypes.ARRAY(DataTypes.STRING)) 
que almacena las plataformas en las que está disponible el videojuego. 
No puede ser nulo.

El segundo argumento pasado a sequelize.define() 
es un objeto de opciones. En este caso, se establece timestamps: false para evitar que Sequelize agregue automáticamente los campos createdAt y updatedAt al modelo.
*/
