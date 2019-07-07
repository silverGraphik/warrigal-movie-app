import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const GenreItem = ({movieByGenre: {poster_path, title, overview, id}}) => {

    return (
        <div className="card text-center">
            <img src={"https://image.tmdb.org/t/p/original" + poster_path} alt={title} style={{width: '150px'}} />
            <h3>{title}</h3>
            <p>{overview}</p>
            <Link to={`/movie/${id}`} className="btn btn-dark">Voire le film</Link>
        </div>
    )
}

GenreItem.propTypes = {
    movieByGenre: PropTypes.object.isRequired,
}

export default GenreItem