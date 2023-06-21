//Esta es la app en sí misma
/*
La primera línea importa los componentes BrowserRouter, Route, Switch 
de la librería react-router-dom. 
Estos componentes son esenciales 
para la implementación de enrutamiento en una aplicación de React.
 */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
/*
Las siguientes líneas importan los componentes específicos 
de la aplicación, como LandingPage, Home, Details, CreateGame y EditVideoGame. 
Estos componentes son los que se utilizarán para renderizar las diferentes vistas de la aplicación.
 */
import LandingPage from './components/LandingPage';
import Home from './components/Home.jsx';
import Details from './components/Details.jsx';
import CreateGame from './components/CreateGame';
import EditVideoGame from './components/EditVideoGame';

//Aquí se define el componente principal App. Es una función de componente sin estado (stateless).
const App = () => {
  return (
    /*
    El componente App envuelve todo el contenido de la aplicación 
    con el componente Router, 
    que establece el contexto del enrutamiento para la aplicación.
     */

    /*
    Dentro del div, se encuentra el componente Switch, 
    que se encarga de renderizar solo la primera Route 
    que coincide con la URL actual. 
    Esto evita que se rendericen múltiples rutas al mismo tiempo.
     */

    /*
    Dentro del componente Switch, 
    se definen varias Route. 
    Cada Route especifica una ruta de URL 
    y el componente que se debe renderizar 
    cuando esa ruta coincida con la URL actual. 
    Por ejemplo, Route exact path="/" component={LandingPage} 
    indica que cuando la ruta sea exactamente /, 
    se renderizará el componente LandingPage.
     */

    /*
    Las rutas como /videogame/:id 
    y /editVideoGame/:id 
    contienen un parámetro :id. 
    Estos son parámetros dinámicos que capturan el valor de id de la URL 
    y lo pasan como una prop a los componentes correspondientes. 
    Por ejemplo, si la URL es /videogame/123, 
    el componente Details recibirá 123 como prop id.
     */
    <Router>
      <div style={{ textAlign: 'center' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/videogame/:id" component={Details} />
          <Route exact path="/createGame" component={CreateGame} />
          <Route exact path="/editVideoGame/:id" component={EditVideoGame} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
