import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CollectionMovieItem = ({collectionPart: {poster_path, title, id}}) => {
    return (
        <div className="film-item">
            <Link to={`/movie/${id}`}><img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={title} />{title}</Link>   
        </div>
    )
}

CollectionMovieItem.propTypes = {
    collectionPart : PropTypes.object.isRequired,
}

export default CollectionMovieItem
