import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GenreItem from '../items/GenreItem';

// let tmdbId;

// if (process.env.NODE_ENV !== 'production') {
//     tmdbId = process.env.REACT_APP_TMDB_API_KEY;
// } else {
//     tmdbId = process.env.TMDB_API_KEY;
// }

const Genre = ({match}) => {
    const [movieByGenre, setMovieByGenre] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        const genreId = match.params.genreId;

        const fetchData = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${genreId}`);
            
            if(isSubscribed) {
                setMovieByGenre(res.data.results);
            }
        };

        fetchData();

        return () => isSubscribed = false;
    });

    return (
        <div className="genreContainer">
            {movieByGenre && movieByGenre.map(movieByGenre => (
                <GenreItem key={movieByGenre.id} movieByGenre={movieByGenre} />
            ))}
        </div>
    )
}

export default Genre;
