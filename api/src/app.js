/* 
En estas líneas se importan los módulos necesarios para el servidor Express. 
express es el framework web, 
cookie-parser se utiliza para analizar las cookies en las solicitudes, 
body-parser se utiliza para analizar los datos del cuerpo de las solicitudes 
y morgan es un middleware de registro de solicitudes HTTP. 
También se importa el archivo de rutas (index.js) donde se definen las rutas del servidor.
*/

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');


/* 
Esta línea requiere el archivo db.js, 
que probablemente contiene la configuración 
y la conexión a la base de datos. 
El archivo se ejecuta para establecer la conexión antes de continuar con la configuración del servidor.
*/ 
require('./db.js');


/* 
Aquí se crea una instancia del servidor Express 
y se establece el nombre del servidor como 'API'.
*/
const server = express();

server.name = 'API';

/*
Estas líneas configuran los middlewares que se utilizarán en el servidor. 
body-parser se utiliza para analizar los datos del cuerpo de las solicitudes en formato URL-encoded y JSON. 
cookie-parser se utiliza para analizar las cookies de las solicitudes. 
morgan se utiliza para registrar información de las solicitudes en la consola en modo de desarrollo ('dev').
*/
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

/*
Este middleware se utiliza para habilitar CORS 
(Cross-Origin Resource Sharing) en el servidor. 
Establece los encabezados necesarios para permitir peticiones desde cualquier origen ('Access-Control-Allow-Origin: *'), 
permitir el envío de cookies ('Access-Control-Allow-Credentials: true'), 
especificar los encabezados permitidos ('Access-Control-Allow-Headers') 
y los métodos permitidos ('Access-Control-Allow-Methods').
 */

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/* 
Aquí se indica que las rutas definidas en el archivo index.js se utilizarán como las rutas principales del servidor. 
Las solicitudes que coincidan con estas rutas serán manejadas por los controladores correspondientes definidos en index.js
*/
server.use('/', routes);

// Error catching endware.
/* 
Este middleware se utiliza como un controlador de errores global. 
Si se produce un error en cualquier middleware o controlador anterior, 
este middleware capturará el error y enviará una respuesta con el estado 
y mensaje de error correspondientes. 
El mensaje de error se obtiene del error (err.message) o, 
si no está presente, se toma el propio error como mensaje.
*/ 
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

/* 
Este código exporta la instancia del servidor Express para que pueda ser utilizada en otros archivos.
*/
module.exports = server;
