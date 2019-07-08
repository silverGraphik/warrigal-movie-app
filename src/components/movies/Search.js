import React, { useState } from 'react';
import PropTypes from 'prop-types';


const Search = ({ searchQuerySend, clearMovies, setAlert, searchMovies}) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if(text === "") {
            setAlert('Aucun terme n\' a été fournit à votre recherche', 'light');
        } else {
            searchMovies(text);
            setText('');  
        }  
    }

    const onChange = (e) => setText(e.target.value);

    return (
        <div>
            <form className="form" onSubmit={onSubmit} >
                <input 
                    type="text" 
                    name="text" 
                    placeholder="Chercher votre film..." 
                    value={text} 
                    onChange={onChange} />
                <input type="submit" value="Rechercher" className="btn btn-dark btn-block" />
            </form>
            {searchQuerySend === true ? <button className="btn btn-light btn-block" onClick={clearMovies}>Retour</button> : null }
        </div>
    )
}

Search.propTypes = {
    searchMovies: PropTypes.func.isRequired,
    clearMovies: PropTypes.func.isRequired,
    searchQuerySend: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
};

export default Search
