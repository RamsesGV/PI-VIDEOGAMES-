import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home.jsx'
import Detail from './components/Detail/Detail.jsx'

function App() {
  return (
    <Router> 
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/Home' component={Home}/>
        <Route exact path='/videogames/:id' component={Detail}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
