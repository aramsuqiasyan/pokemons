import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router'
import PokemonList from './components/PokemonList'
import PokemonView from "./components/PokemonView";
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <h3 className='nav-item'>
                    <Link to="/">List</Link>
                </h3>

                <Switch>
                    <Route path="/" exact={true} component={PokemonList} />
                    <Route path="/pokemon/:name" component={PokemonView} />
                    <Redirect to='/' />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
