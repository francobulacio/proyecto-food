import './App.css';
import Nav from './components/Nav/Nav'
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import {Route, useLocation} from "react-router-dom";


function App() {

    const location = useLocation()

  return (
      <div className="App">
           <div className="nav"> {location.pathname !== '/' && <Nav/>}</div>
            <Route path='/home' component = { Home } />
            <Route exact path='/' render={ ()=> <Landing /> } />
            <Route path='/form' component={Form} />
            <Route path='/detail/:id' component={Detail} />
        </div>
  );
}

export default App;
