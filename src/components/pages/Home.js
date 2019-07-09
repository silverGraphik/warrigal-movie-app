import React, { Fragment } from 'react';
import Movies from '../movies/Movies';
import Search from '../movies/Search';

const Home = () => {
    return (
        <Fragment>
            <Search />
            <Movies />
        </Fragment>
    )
}

export default Home
