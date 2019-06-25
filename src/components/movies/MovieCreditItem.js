import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MovieCreditItem = ({movieCreditResult: {name, job, id}}) => {
    return (
        <li>
            <Link to={`./crew/${id}`}>{name}</Link>
            <p>{job}</p>
        </li>
    )
}

MovieCreditItem.propTypes = {
    movieCreditResult: PropTypes.object.isRequired,
}

export default MovieCreditItem
