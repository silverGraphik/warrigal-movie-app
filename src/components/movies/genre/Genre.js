import React, { Component } from 'react';
import axios from 'axios';
import GenreItem from '../items/GenreItem';

class Genre extends Component {
    state = {
        movieByGenre: []
    }

    async componentDidMount() {
        const genreId = this.props.match.params.genreId;
        const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${genreId}`);
        this.setState({
            movieByGenre: res.data.results,
        });

        // console.log(this.state.movieByGenre);
    }

    render() {
        const moviesByGenre = this.state.movieByGenre;

        return (
            <div className="genreContainer">
                {moviesByGenre && moviesByGenre.map(movieByGenre => (
                    <GenreItem key={movieByGenre.id} movieByGenre={movieByGenre} />
                ))}
            </div>
        )
    } 
}

export default Genre;
