import React, { Component, Fragment } from 'react';
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


class App extends Component {
  state = {
    movies: [],
    movie: {},
    loading: false,
    searchQuerySend: false,
    alert: null
  }


  // display une liste de film à découvrir lorsque l'application charge
  async componentDidMount() {
    this.setState({loading: true});
    const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`); 
    this.setState({movies: res.data.results, loading: false});

  }

  // Résultat de la recherche 
  searchMovies = async text => {
    this.setState({loading: true});

    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR&query=${text}&page=1&include_adult=false`);
    
    // console.log(res.data.results); 
    this.setState({movies: res.data.results, loading: false, searchQuerySend: true});
  }

  // Requête pour un seul Film
  getMovie = async (movie_id) => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
  
    this.setState({movie: res.data, loading: false});
  };
  //Retour au film à découvrir
  clearMovies = async () => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`); 
    this.setState({movies: res.data.results, loading: false, searchQuerySend: false});
  };

  // Set Alert si aucun terme n'est renseinger
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});

    setTimeout(() => this.setState({alert: null}), 5000);
  }

  render() {
    const { searchQuerySend, loading, movies, movie } = this.state
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search 
                    searchMovies={this.searchMovies} 
                    clearMovies={this.clearMovies} 
                    searchQuerySend={searchQuerySend} 
                    setAlert={this.setAlert} />
                  <Movies 
                    loading={loading}  
                    movies={movies} />
                </Fragment>
                )} 
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/movie/:movieId' render={props => (
                <Movie { ...props } getMovie={this.getMovie} movie={movie} loading={loading} />
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
}

export default App;
