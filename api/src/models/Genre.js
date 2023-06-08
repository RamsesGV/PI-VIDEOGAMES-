const { DataTypes } = require('sequelize')

module.exports = (sequelize) => { 
    sequelize.define('genre', { 

        id: {
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false
        },

        name: { 
            type:DataTypes.STRING,
            validate: { 
                len: { 
                    args:[1,30],
                    msg:'El genero no es valido.'
                }
            }
        }

    },{timestamps:false, freezeTableName:true})
}