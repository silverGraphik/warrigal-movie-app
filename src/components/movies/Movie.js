import React, { Component } from 'react';
import axios from 'axios';
import MovieCreditItem from './MovieCreditItem';

export class Movie extends Component {
    state = {
        movieCreditResult: {},
    }


    async componentDidMount() {
        this.props.getMovie(this.props.match.params.movieId);
        // this.props.getMovieCredit(this.props.match.params.movieId);

        const movieId = this.props.match.params.movieId
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        this.setState({movieCreditResult: res.data.crew});
        
        // console.log(this.state.movieCreditResult);
    }

    render() {
        const { 
            adult,
            budget,
            genres,
            imdb_id,
            original_language,
            original_title,
            overview,
            popularity,
            poster_path,
            backdrop_path,
            production_companies,
            production_countries,
            release_date,
            revenue,
            runtime,
            spoken_languages,
            status,
            tagline,
            title,
            video,
            vote_average,
            vote_count } = this.props.movie;

            // utilisation du spread  opreator pour pouvoir sortir la date de son objet et ne récupérer que l'année
            let yearSpread = {...release_date};
            let year = [];
            for(let i=0; i<4; i++) {
                year.push(yearSpread[i]);
            }

            // console.log(this.state.movieCreditResult[0]);

            //transformation du vote en %
            let votePourcent = vote_average * 10;

            const { loading } = this.props;
        return (
            <div className="bg-dark movieHeadline">
                <div className='container grid-2'>
                    <img src={"https://image.tmdb.org/t/p/w185" + poster_path} alt={title} />
                    <div className="content">
                        <h1>{title}<span className="date">({year})</span></h1>
                        <ul className="toolBox">
                            <li className="rating">
                                <div className="voteOuterCircle">
                                    <div className="voteInnerCircle">
                                        {votePourcent}%
                                    </div>
                                </div>
                                <p>Note des utilisateurs</p>
                            </li>
                            <li className="toolBox-icon">
                                <p className="tollBox-linkItem"><i className="fas fa-list"></i></p>
                            </li>
                            <li className="toolBox-icon">
                                <p className="tollBox-linkItem"><i className="fas fa-heart"></i></p>
                            </li>
                            <li className="toolBox-link">
                                <p className="tollBox-linkItem"><i className="fas fa-play"></i> Regarder le trailer</p>
                            </li>
                        </ul>
                        <div className="synopsis">
                            <h2>Synopsis</h2>
                            <p>{overview}</p>
                        </div>
                        <div className="technical">
                            <h2>Equipe technique en vedette</h2>
                            <ul className="technicalStaff">
                                {this.state.movieCreditResult[0] ? <MovieCreditItem key={this.state.movieCreditResult[0].id} movieCreditResult={this.state.movieCreditResult[0]} /> : null}
                                {this.state.movieCreditResult[1] ? <MovieCreditItem key={this.state.movieCreditResult[1].id} movieCreditResult={this.state.movieCreditResult[1]} /> : null}
                                {this.state.movieCreditResult[2] ? <MovieCreditItem key={this.state.movieCreditResult[2].id} movieCreditResult={this.state.movieCreditResult[2]} /> : null}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


// !
// !
// !
// !
// ! La solution à mon problème devrait se trouver dans l'architecture App.js display des films en vedette
// !
// ! je vais devoir créer un composant qui prendra en charge un item et ensuite l'introduire dans le component
// ! Movie.js de la même manière que je l'ai fait que pour MovieItem !!!!
// !
            


export default Movie
