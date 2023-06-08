const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: { 
      type:DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        len:{
          args:[1,20],
          msg:'El nombre del videojuego debe contener entre 1 a 20 caracteres'
        }
      }
    },
    
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    description: { 
      type:DataTypes.STRING

  },
  platforms: {
    type:DataTypes.ARRAY(DataTypes.STRING),
    allowNull:false,
    validate: {
      notEmpty: { 
        args:true,
        msg:'Debe proporcionar al menos una plataforma'
      }
    }
  },

  image: { 
    allowNull:false,
    type:DataTypes.STRING,
    validate: { 
      isUrl: {
        msg:'Imagen no valida.'
      }
    }
  },

  released: { 
    type:DataTypes.DATE,
    allowNull:false,
  },

  rating: { 
    type:DataTypes.FLOAT
  }

  },{timestamps: false, freezeTableName:true});
};
