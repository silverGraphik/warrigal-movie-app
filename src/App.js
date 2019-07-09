import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Movie from './components/movies/Movie';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/users/Login';
import Genre from './components/movies/genre/Genre';
import Collection from './components/movies/collection/Collection';
import NotFound from './components/pages/NotFound';

import MoviesState from './context/Movies/MoviesState';
import AlertState from './context/Alert/AlertState';



const App = () => {
    return (
      <MoviesState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar />
              <div>
                <Alert />
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/movie/:movieId' component={Movie} />
                  <Route exact path='/movie/genre/:genreId' component={Genre} />
                  <Route exact path='/movie/collection/:collectionId' component={Collection} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </Router>
        </AlertState>
      </MoviesState>
    );
}

export default App;
