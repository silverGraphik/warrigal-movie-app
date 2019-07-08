import React, { useState , useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Movies from './components/movies/Movies';
import Movie from './components/movies/Movie';
import Search from './components/movies/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import Genre from './components/movies/genre/Genre';
import Collection from './components/movies/collection/Collection';
import axios from 'axios';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [searchQuerySend, setSearchQuerySend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  
  
  
  // liste de film à voir display dés le départ
  useEffect(() => {
    setLoading(true);

    const fetchMovies = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
      setMovies(res.data.results);
      setLoading(false);
    }
    fetchMovies();
  }, []);

  // Résultat de la recherche 
  const searchMovies = async text => {
    setLoading(true);

    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR&query=${text}&page=1&include_adult=false`);
    
    setMovies(res.data.results);
    setLoading(false);
    setSearchQuerySend(true);
  }

  // Requête pour un seul Film
  const getMovie = async (movie_id) => {
    setLoading(true);

    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
  
    setMovie(res.data);
    setLoading(false);
  };
  //Retour au film à découvrir
  const clearMovies = async () => {
    setLoading(true);

    const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`); 

    setMovies(res.data.results);
    setLoading(false);
    setSearchQuerySend(false);
  };

  // Set Alert si aucun terme n'est renseinger
  const showAlert = (msg, type) => {
    setAlert({msg, type});

    setTimeout(() => setAlert(null), 5000);
  };

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div>
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search 
                    searchMovies={searchMovies} 
                    clearMovies={clearMovies} 
                    searchQuerySend={searchQuerySend} 
                    setAlert={showAlert} />
                  <Movies 
                    loading={loading}  
                    movies={movies} />
                </Fragment>
                )} 
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/movie/:movieId' render={props => (
                <Movie { ...props } getMovie={getMovie} movie={movie} loading={loading} />
              )} />
              <Route exact path='/movie/genre/:genreId' render={props => (
                <Genre { ...props } />
              )} />
              <Route exact path='/movie/collection/:collectionId' render={props => (
                <Collection { ...props } />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
}

export default App;
