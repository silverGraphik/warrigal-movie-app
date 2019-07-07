import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CollectionCastItem = ({movieCreditCast: {name, job, id, profile_path, character}}) => {
    return (
        <li className="cast-crew-item">
            <div className="img-container"><img src={`https://image.tmdb.org/t/p/original${profile_path}`} alt={name} /></div>
            <div>
                <Link to={`./cast/${id}`}><strong>{name}</strong></Link>
                <p>{character}</p>
            </div>
        </li>
    )
}

CollectionCastItem.propTypes = {
    movieCreditCast: PropTypes.object.isRequired,
}

export default CollectionCastItem