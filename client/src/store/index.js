
//STORE
/*
import { legacy_createStore as createStore, applyMiddleware } from 'redux';

Importa la función createStore de Redux para crear el store y applyMiddleware 
para aplicar middlewares.
import { composeWithDevTools } from 'redux-devtools-extension';

Importa la función composeWithDevTools de la extensión redux-devtools-extension, 
que permite utilizar la extensión de Redux DevTools para facilitar el debugging 
del estado de la aplicación.
import thunk from 'redux-thunk';

Importa el middleware redux-thunk. Thunk es un middleware que permite el manejo 
de acciones asíncronas en Redux, 
lo que te permite realizar acciones asíncronas como solicitudes HTTP 
antes de que se envíen las acciones al reducer.

import rootReducer from '../reducer/index.js';

Importa el reducer principal (rootReducer) que combina todos los reducers 
de la aplicación en uno solo.

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

Crea el store de Redux utilizando la función createStore.
rootReducer se pasa como argumento para definir cómo se actualiza el estado de la aplicación 
en respuesta a las acciones.

composeWithDevTools se utiliza para aplicar la extensión de Redux DevTools al store.
applyMiddleware(thunk) se utiliza para aplicar el middleware redux-thunk al store, 
lo que permite el manejo de acciones asíncronas.
 */
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index.js'


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));