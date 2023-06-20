const { DataTypes, STRING } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
sequelize.define(
    'genre',
    {
    id: {
        type: DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,

    },
    name: {
        type: DataTypes.STRING,
    },
    },
    {
    timestamps: false,
    },
)
}
/*
En este bloque, 
se define el modelo 'genre' 
utilizando el método define() de la instancia de sequelize. 
Se definen los campos y sus atributos correspondientes.

id: Es un campo de tipo UUID (identificador único universal) 
que se genera automáticamente (defaultValue: DataTypes.UUIDV4). 
Es una clave primaria (primaryKey: true) y no puede ser nulo (allowNull: false).

name: Es un campo de tipo cadena (DataTypes.STRING) 
que representa el nombre del género. Puede ser nulo.

El segundo argumento pasado a sequelize.define() 
es un objeto de opciones. En este caso, 
se establece timestamps: false 
para evitar que Sequelize agregue automáticamente los campos createdAt y updatedAt al modelo.
 */
