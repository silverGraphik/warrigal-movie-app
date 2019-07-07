import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MovieCastItem = ({movieCreditCast: {name, job, id, profile_path, character}}) => {
    return (
        <li className="card actors">
            <img src={`https://image.tmdb.org/t/p/original${profile_path}`} alt={name} />
            <Link to={`./cast/${id}`}><strong>{name}</strong></Link>
            <p>{character}</p>
        </li>
    )
}

MovieCastItem.propTypes = {
    movieCreditCast: PropTypes.object.isRequired,
}

export default MovieCastItem
