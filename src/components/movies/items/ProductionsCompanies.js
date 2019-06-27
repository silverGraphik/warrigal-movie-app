import React from 'react';
import PropTypes from 'prop-types';

const ProductionsCompanies = ({productionCo: name, logo_path}) => {

    return (
        <li>
            <img src={`https://api.themoviedb.org/3/company/${logo_path}`} alt={name} /> {name}
        </li>
    )
}

ProductionsCompanies.propTypes = {
    productionCo: PropTypes.object.isRequired,
}

export default ProductionsCompanies
