import React, { Component } from 'react';
import axios from 'axios';
import CollectionCastItem from '../items/CollectionCastItem';
import CollectionCrewItem from '../items/CollectionCrewItem';
import CollectionMovieItem from '../items/CollectionMovieItem';



class Collection extends Component {
    state = {
        collection: [],
        collectionPart: [],
        movieCreditCrew: {},
        movieCreditCast: {},
        thisMovieGenre: [],
        listOfGenre: [],
    }

    async componentDidMount() {
        const collectionId = this.props.match.params.collectionId;

        const res = await axios.get(`https://api.themoviedb.org/3/collection/${collectionId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`);
        const cred = await axios.get(`https://api.themoviedb.org/3/movie/${res.data.parts[0].id}/credits?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        const genr = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`);

        this.setState({
            collection: res.data,
            collectionPart: res.data.parts,
            movieCreditCrew: cred.data.crew,
            movieCreditCast: cred.data.cast,
            thisMovieGenre: res.data.parts[0].genre_ids,
            listOfGenre: genr.data.genres
        });

        // console.log(genr.data.genres);
        // console.log(res.data.parts[0].genre_ids);
    }
    
    render() {
        const {
            poster_path, 
            backdrop_path,
            name,
            overview} = this.state.collection;

        // console.log(this.state.collectionPart);

        // fonction pour la récupération des genres d'un film d'une collection
        const getCollectionGenre = () => {
            const collectionGenre = [];
            this.state.thisMovieGenre.forEach(genre => {
                for (let i = 0; i < this.state.listOfGenre.length; i++) {
                    if (genre === this.state.listOfGenre[i].id) {
                        collectionGenre.push(this.state.listOfGenre[i].name)
                    }
                }
            });
            return collectionGenre.join(", ");
        };


        // Fonction pour la récupération du cast et staff technique d'un film
        const getCreditCast = () => {
            const creditCast = [];
            if (this.state.movieCreditCast.length > 0) {
                for(let i = 0; i < 6; i++) {
                    creditCast.push(<CollectionCastItem key={i} movieCreditCast={this.state.movieCreditCast[i]} />);
                }
            }
            return creditCast;
        };

        const getCreditCrew = () => {
            const creditCrew = [];
            if (this.state.movieCreditCrew.length > 0) {
                for(let i = 0; i < 6; i++) {
                    creditCrew.push(<CollectionCrewItem key={i} movieCreditCrew={this.state.movieCreditCrew[i]} />);
                }
            }
            return creditCrew;
        };

        const getMovieCollection = () => {
            const movieCollection = [];
            if(this.state.collectionPart.length > 0) {
                for(let i = 0; i < this.state.collectionPart.length; i++) {
                    movieCollection.push(<CollectionMovieItem key={this.state.collectionPart[i].id} collectionPart={this.state.collectionPart[i]} />)
                }
            }

            return movieCollection.sort((a,b) => a.key - b.key);
        }

        console.log(getMovieCollection());

        return (
            <div className="collection-container">
                <div className="collection-header" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`}}></div>
                <div className="container collec">
                    <div className="tile-information-container">
                        <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={name} />
                        <div className="title-container">
                            <h2>{name}</h2>
                        </div>
                    </div>
                    <div className="syn-inf-dis-equ-container">
                        <div className="collect-item">
                            <h2>Synopsis</h2>
                            <hr/>
                            <p>{overview}</p>
                        </div>
                        <div className="collect-item">
                            <h2>Informations</h2>
                            <hr/>
                            <p><strong>Nombre de films : </strong>{this.state.collectionPart.length}</p>
                            <p><strong> Genres: </strong>{getCollectionGenre()}</p>
                        </div>
                        <div className="collect-item">
                            <h2>Distribution en vedette :</h2>
                            <hr />
                            <ul className="cast-crew-list">
                                {getCreditCast()}
                            </ul>
                        </div>
                        <div className="collect-item">
                            <h2>Equipe technique en vedette :</h2>
                            <hr />
                            <ul className="cast-crew-list">
                                {getCreditCrew()}
                            </ul>
                        </div>
                    </div>
                    <div className="films">
                        <h2>Films</h2>
                        <hr />
                        <div className="films-container">
                            {getMovieCollection()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Collection
