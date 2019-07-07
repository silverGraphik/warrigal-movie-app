import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const RecommendationsItem = ({recommendationList: {poster_path, title, id}}) => {

    return (
        <li className="recommendation-items">
            <Link to={`/movie/${id}`} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${poster_path})`}}>
                <p>{title}</p>
            </Link>
        </li>
    )
}

RecommendationsItem.propTypes = {
    recommendationList: PropTypes.object.isRequired,
}

export default RecommendationsItem