import React, { useContext } from 'react'
import MovieItem from './items/MovieItem';
import Spinner from '../layout/Spinner';
import MoviesContext from '../../context/Movies/moviesContext';


const  Movies = () => {
    const moviesContext = useContext(MoviesContext);

    const { loading, movies } = moviesContext;

    if(loading) {
        return <Spinner />
    } else {
        return (
            <div style={movieStyle}>
                {movies.map(movie => (
                    <MovieItem key={movie.id} movie={movie} />
                ))}
            </div>
        )
    }
}

const movieStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gridGap: '1rem'
}

export default Movies
