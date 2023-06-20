//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
//Esta línea importa el módulo app.js ubicado en la carpeta src. 
//El módulo app.js probablemente contiene la configuración y la lógica principal de la aplicación.
const { conn } = require('./src/db.js');
//Esta línea importa la variable conn desde el módulo db.js 
//ubicado en la carpeta src/db.js. 
//La variable conn probablemente representa la conexión a la base de datos de la aplicación.

// Syncing all the models at once.
/*
Aquí se invoca el método sync() en la variable conn, 
que probablemente sincroniza los modelos de la base de datos 
con la definición de los modelos en la aplicación. 
El parámetro { force: true } 
indica que se eliminarán y recrearán las tablas en la base de datos cada vez que se sincronice. 
Esto puede ser útil en el desarrollo para aplicar cambios en el esquema de la base de datos.
 */
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
/*
Esta línea inicia el servidor HTTP en el puerto 3001 
utilizando el método listen() 
en la variable server. 
El servidor probablemente utilizará el módulo app.js 
para manejar las solicitudes HTTP entrantes.
 */