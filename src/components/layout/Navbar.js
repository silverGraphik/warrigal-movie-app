import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Navbar = ({ img_url, title }) => {
    return (
        <nav className="navbar bg-primary">
            <div className="navbrand">
                <img src={img_url} alt={title} style={{width: '60px'}} />
                <h1>{title}</h1>
            </div>
            <ul>
                <li>
                    <Link to='/'>Accueil</Link>
                </li>
                <li>
                    <Link to='/about'>A Propos</Link>
                </li>
            </ul>
        </nav>
    )
}

Navbar.defaultProps = {
    img_url: 'https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg',
    title: 'The Movie App'
};

Navbar.propTypes = {
    img_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default Navbar
