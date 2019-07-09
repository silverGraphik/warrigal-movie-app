import React, { useState, useContext } from 'react';
import MoviesContext from '../../context/Movies/moviesContext';
import AlertContext from '../../context/Alert/alertContext';


const Search = () => {
    const moviesContext = useContext(MoviesContext);
    const alertContext = useContext(AlertContext);


    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if(text === "") {
            alertContext.setAlert('Aucun terme n\' a été fournit à votre recherche', 'light');
        } else {
            moviesContext.searchMovies(text);
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
            {moviesContext.searchQuerySend === true ? <button className="btn btn-light btn-block" onClick={moviesContext.clearMovies}>Retour</button> : null }
        </div>
    )
}

export default Search
