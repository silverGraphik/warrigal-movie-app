import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CollectionCastItem from '../items/CollectionCastItem';
import CollectionCrewItem from '../items/CollectionCrewItem';
import CollectionMovieItem from '../items/CollectionMovieItem';



const Collection = ({match}) => {
    const [collection, setCollection] = useState([]);
    const [collectionPart, setCollectionPart] = useState([]);
    const [movieCreditCrew, setMovieCreditCrew] = useState({});
    const [movieCreditCast, setMovieCreditCast] = useState({});
    const [thisMovieGenre, setThisMovieGenre] = useState([]);
    const [listOfGenre, setListOfGenre] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        const collectionId = match.params.collectionId;

        const fetchData = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/collection/${collectionId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`);
            const cred = await axios.get(`https://api.themoviedb.org/3/movie/${res.data.parts[0].id}/credits?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
            const genr = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`);

            if(isSubscribed) {
                setCollection(res.data);
                setCollectionPart(res.data.parts);
                setMovieCreditCrew(cred.data.crew);
                setMovieCreditCast(cred.data.cast);
                setThisMovieGenre(res.data.parts[0].genre_ids);
                setListOfGenre(genr.data.genres);
            }
        };

        fetchData();

        return () => isSubscribed = false;

    });
    
    const {
        poster_path, 
        backdrop_path,
        name,
        overview} = collection;

    // console.log(collectionPart);

    // fonction pour la récupération des genres d'un film d'une collection
    const getCollectionGenre = () => {
        const collectionGenre = [];
        thisMovieGenre.forEach(genre => {
            for (let i = 0; i < listOfGenre.length; i++) {
                if (genre === listOfGenre[i].id) {
                    collectionGenre.push(listOfGenre[i].name)
                }
            }
        });
        return collectionGenre.join(", ");
    };


    // Fonction pour la récupération du cast et staff technique d'un film
    const getCreditCast = () => {
        const creditCast = [];
        if (movieCreditCast.length > 0) {
            for(let i = 0; i < 6; i++) {
                creditCast.push(<CollectionCastItem key={i} movieCreditCast={movieCreditCast[i]} />);
            }
        }
        return creditCast;
    };

    const getCreditCrew = () => {
        const creditCrew = [];
        if (movieCreditCrew.length > 0) {
            for(let i = 0; i < 6; i++) {
                creditCrew.push(<CollectionCrewItem key={i} movieCreditCrew={movieCreditCrew[i]} />);
            }
        }
        return creditCrew;
    };

    const getMovieCollection = () => {
        const movieCollection = [];
        if(collectionPart.length > 0) {
            for(let i = 0; i < collectionPart.length; i++) {
                movieCollection.push(<CollectionMovieItem key={collectionPart[i].id} collectionPart={collectionPart[i]} />)
            }
        }

        return movieCollection.sort((a,b) => a.key - b.key);
    }

    // console.log(collectionPart);
    // console.log(getMovieCollection());
    // ! problème avec le sort qui trie les informations à l'aide de leur key qui n'est autre que l'id du film
    // ! mais l'id du film avengers infinity est supérieur à celui du film avengers endgame
    // ! par conséquent il me faut trouver une meilleur manière de trier les films pour ne plus avoir se genre de problème
    // * les informations receuillis de l'api tmdb/collection/parts ne permet pas de pouvoir trier
    // * la solution résiderais dans une nouvelle requête API récupérant le détail de chaque film composant la collection
    // * de récupérer la date et de trier les dates du plus ancien au plus récent !!!


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
                        <p><strong>Nombre de films : </strong>{collectionPart.length}</p>
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

export default Collection
