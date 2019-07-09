import React, {useReducer, useEffect } from 'react';
import axios from 'axios';
import MoviesContext from './moviesContext';
import MoviesReducer from './moviesReducer';
import {
    SEARCH_MOVIES,
    SET_LOADING,
    CLEAR_MOVIES,
    GET_MOVIE,
    SEARCH_QUERY_SEND,
    INITIAL_LIST_OF_MOVIES,
} from '../types';

let tmdbId;

if(process.env.NODE_ENV !== 'production') {
    tmdbId = process.env.REACT_APP_TMDB_API_KEY;
} else {
    tmdbId = process.env.TMDB_API_KEY;
}

const MoviesState = props => {
    const initialState = {
        movies: [],
        movie: {},
        loading: false,
        searchQuerySend: false
    }

    const [ state, dispatch] = useReducer(MoviesReducer, initialState);


    // Liste initial de film
    useEffect(() => {
        setLoading();

        const fetchMovies = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=59c76c5b0623517c046a93a7c472e779&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
            
            dispatch({
                type: INITIAL_LIST_OF_MOVIES,
                payload: res.data.results
            });
        };
        fetchMovies();
    }, []);


    // Résultat de la recherche 
    const searchMovies = async text => {
        setLoading();

        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbId}&language=fr-FR&query=${text}&page=1&include_adult=false`);
        
        
        dispatch({
            type: SEARCH_MOVIES,
            payload: res.data.results
        });
        searchQuerySend();
    }

    // Requête pour un seul Film
    const getMovie = async movie_id => {
        setLoading();

        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?language=fr-FR&api_key=${tmdbId}`);

        dispatch({
            type: GET_MOVIE,
            payload: res.data
        })
    };

    //Retour au film à découvrir
    const clearMovies = async () => {
        setLoading();

        const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${tmdbId}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);

        dispatch({
            type: CLEAR_MOVIES,
            payload: res.data.results
        });
    };


    // Search query send
    const searchQuerySend = () => dispatch({type: SEARCH_QUERY_SEND});


    // Set loading
    const setLoading = () => dispatch({type: SET_LOADING});



    return <MoviesContext.Provider
        value={{
            movies: state.movies,
            movie: state.movie,
            loading: state.loading,
            searchQuerySend: state.searchQuerySend,
            searchMovies,
            clearMovies,
            getMovie,
        }}
    >
        {props.children}
    </MoviesContext.Provider>
}

export default MoviesState;