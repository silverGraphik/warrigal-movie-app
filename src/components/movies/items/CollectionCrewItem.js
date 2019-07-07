import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CollectionCrewItem = ({movieCreditCrew: {name, job, id, profile_path, character}}) => {
    return (
        <li className="cast-crew-item">
            <div className="img-container"><img src={`https://image.tmdb.org/t/p/original${profile_path}`} alt={name} /></div>
            <div>
                <Link to={`./crew/${id}`}><strong>{name}</strong></Link>
                <p>{job}</p>
            </div>
        </li>
    )
}

CollectionCrewItem.propTypes = {
    movieCreditCrew: PropTypes.object.isRequired,
}

export default CollectionCrewItem