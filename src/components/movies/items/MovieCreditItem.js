import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MovieCreditItem = ({movieCreditCrew: {name, job, id}}) => {
    return (
        <li>
            <Link to={`./crew/${id}`}><strong>{name}</strong></Link>
            <p>{job}</p>
        </li>
    )
}

MovieCreditItem.propTypes = {
    movieCreditCrew: PropTypes.object.isRequired,
}

export default MovieCreditItem
