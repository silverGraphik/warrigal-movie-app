import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchMovies: PropTypes.func.isRequired,
        clearMovies: PropTypes.func.isRequired,
        searchQuerySend: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    };

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.text === "") {
            this.props.setAlert('Aucun terme n\' a été fournit à votre recherche', 'light');
        } else {
          this.props.searchMovies(this.state.text);
            this.setState({text: ''});  
        }  
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { searchQuerySend, clearMovies } =this.props;
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit} >
                    <input 
                        type="text" 
                        name="text" 
                        placeholder="Chercher votre film..." 
                        value={this.state.text} 
                        onChange={this.onChange} />
                    <input type="submit" value="Rechercher" className="btn btn-dark btn-block" />
                </form>
                {searchQuerySend === true ? <button className="btn btn-light btn-block" onClick={clearMovies}>Retour</button> : null }
            </div>
        )
    }
}

export default Search
