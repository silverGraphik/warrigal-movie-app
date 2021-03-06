import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieCreditItem from './items/MovieCreditItem';
import MovieCastItem from './items/MovieCastItem';
import RecommendationsItem from './items/RecommendationsItem';
import MoviesContext from '../../context/Movies/moviesContext';


// let tmdbId;

// if (process.env.NODE_ENV !== 'production') {
//     tmdbId = process.env.REACT_APP_TMDB_API_KEY;
// } else {
//     tmdbId = process.env.TMDB_API_KEY;
// }

const Movie = ({ match }) => {
    const moviesContext = useContext(MoviesContext);

    const { getMovie, movie, clearMovies } = moviesContext;

    const [movieCreditCrew, setMovieCreditCrew] = useState({});
    const [movieCreditCast, setMovieCreditCast] = useState({});
    const [recommendationsList, setRecommendationsList] = useState([]);

    const movieId = match.params.movieId;


    // Récupération à l'aide d'une requête API des crédits et des recommendation de films + rester à l'écoute des changement dans l'url
    useEffect(() => {
        getMovie(match.params.movieId);

        const fetchCredit = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
            setMovieCreditCast(res.data.cast);
            setMovieCreditCrew(res.data.crew);
        };

        const fetchRecommendationList = async () => {
            const recom = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=fr-FR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
            setRecommendationsList(recom.data.results);
        };

        fetchCredit();
        fetchRecommendationList();

        // console.log(movieId);
        // eslint-disable-next-line
    }, [movieId]); // permet de rester à l'écoute de changement du movieId

        const { 
            budget,
            genres,
            original_language,
            original_title,
            overview,
            popularity,
            poster_path,
            production_companies,
            production_countries,
            release_date,
            revenue,
            runtime,
            spoken_languages,
            status,
            title,
            vote_average,
            vote_count,
            belongs_to_collection } = movie;

        // utilisation du spread  opreator pour pouvoir sortir la date de son objet et récupérer 
        // toute les information nécessaire en information utile et pertinente
        let yearSpread = {...release_date};
        let year = yearSpread[0] + yearSpread[1] + yearSpread[2] + yearSpread[3];

        let month = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

        let movieMonth = yearSpread[5] + yearSpread[6];

        let releaseMonth = month[movieMonth - 1];

        let dayOfRelease = yearSpread[8] + yearSpread[9];

        let dateOfRelease = `${dayOfRelease} ${releaseMonth} ${year}`;

        // boucle pour récupérer les 3 premiers éléments du tableau des crédits du film
        let crewRows = [];
        if (movieCreditCrew.length > 0) {
            for (let i = 0; i < 3; i++) {
                crewRows.push(<MovieCreditItem key={i} movieCreditCrew={movieCreditCrew[i]} />);
            }
        } 

        // boucle pour récupérer les 5 premiers Acteurs du film
        let castRows = [];
        if (movieCreditCast.length > 0) {
            for (let i = 0; i < 5; i++) {
                castRows.push(<MovieCastItem key={i} movieCreditCast={movieCreditCast[i]} />);
            }
        }

        // boucle pour itérer sur chaque item productions_compagnies
        let productionCompanies = [];
        production_companies && production_companies.forEach(production_companie => {
            productionCompanies.push(<li key={production_companie.id}><img src={`https://image.tmdb.org/t/p/w185${production_companie.logo_path}`} alt={production_companie.name} style={{width: '100px', marginTop: '10px'}} /></li>)
        });

        //Transformation du temps de durée de film en Heure
        let movieHour = Math.floor(runtime / 60);
        let movieMinute = runtime % 60;

        let movieDuration = `${movieHour}h ${movieMinute}min.`;

        //rendre le revenue et budget d'un film plus facile à lire pour l'utilisateur
        const addStyleToBudgetRevenue = (budRev) => {
            let newArr = ('' + budRev).split('').map(function (digit) { 
                return digit;
            });
            if (newArr.length > 6 && newArr.length < 8) {
                return `${newArr[0]}-${newArr[1]}${newArr[2]}${newArr[3]}-${newArr[4]}${newArr[5]}${newArr[6]}`;
            } else if (newArr.length > 7 && newArr.length < 9) {
                return `${newArr[0]}${newArr[1]}-${newArr[2]}${newArr[3]}${newArr[4]}-${newArr[5]}${newArr[6]}${newArr[7]}`;
            } else if (newArr.length > 8 && newArr.length < 10) {
                return `${newArr[0]}${newArr[1]}${newArr[2]}-${newArr[3]}${newArr[4]}${newArr[5]}-${newArr[6]}${newArr[7]}${newArr[8]}`;
            } else if (newArr.length > 9 && newArr.length < 11) {
                return `${newArr[0]}-${newArr[1]}${newArr[2]}${newArr[3]}-${newArr[4]}${newArr[5]}${newArr[6]}-${newArr[7]}${newArr[8]}${newArr[9]}`;
            }
            return newArr[0];
        }


        // Math.round sur la popularité pour obtenir un chiffre rond
        let populaire = Math.floor(popularity);

        // console.log(belongs_to_collection);

        //transformation du vote en %
        let votePourcent = vote_average * 10;

        // Limitation du nombre d'élément recommander montrer à l'utilisateur

        let recommendationsArr = [];

       

        if(recommendationsList.length <= 0) {
            return null;
        } else {
            for(let i = 0; i < 4; i++) {
                recommendationsArr.push(<RecommendationsItem key={i} recommendationList={recommendationsList[i]} />);
            }
        }

        // console.log(genres);

        // const { loading } = this.props;
        return (
            <div className="moviePAgeContent">
                <div className="bg-dark movieHeadline">
                    <div className='container grid-2'>
                        <img src={"https://image.tmdb.org/t/p/original" + poster_path} alt={title} />
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
                                    {crewRows}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mainContent">
                    <div className="centralContent">
                        <div className="teteAffiche">
                            <h2>Tête d'affiche</h2>
                            <ul className="grid-5">
                                {castRows}
                            </ul>
                        </div>
                        {belongs_to_collection && <div className="collection" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${belongs_to_collection.poster_path})`}}>
                            <div className="overlay"></div>
                            <h2>{belongs_to_collection.name}</h2>
                            <Link to={`collection/${belongs_to_collection.id}`} className="collectionButton">Voire la collection</Link>
                        </div>}
                        <div className="recomm">
                            <h2>Recommendations</h2>
                            <ul className="recommendation-container">
                                {recommendationsArr && recommendationsArr}
                            </ul>
                        </div>
                    </div>
                    <aside className="aside">
                        <h3>Informations</h3>
                        <div className="aside-item originalTitle"><h3>Titre d'origine</h3><p>{original_title}</p></div>
                        <ul className="aside-item productionCompanies">
                            {productionCompanies}
                        </ul>
                        <div className="aside-item status"><h3>Status</h3><p>{status === "Released" ? "Sorti" : "A venir"}</p></div>
                        <div className="aside-item releaseInfos">
                            <h3>Informations sur la sortie</h3>
                            <p>{status === "Released" ? `Sorti le ${dateOfRelease} au cinéma.` : `A paraitre le ${dateOfRelease}`}</p>
                        </div>
                        <div className="aside-item OriginalLanguage"><h3>Langue originale</h3>{original_language}</div>
                        <div className="aside-item spokenLanguage">
                            <h3>Langue(s) parlé(s)</h3>
                            <ul className="spokenLang">
                                { spoken_languages ? spoken_languages.map(spoken_language => (<li key={spoken_language.iso_639_1}>- {spoken_language.name}</li>)) : null }
                            </ul>
                        </div>
                        <div className="aside-item duration"><h3>Durée</h3><p>{runtime === 0 ? `-` : `${movieDuration}`}</p></div>
                        <div className="aside-item productionCountries">
                            <h3>Pays de production(s)</h3>
                            <ul className="productionCountry">
                                { production_countries ? production_countries.map(production_country => (<li key={production_country.iso_3166_1}>- {production_country.name}</li>)) : null }
                            </ul>
                        </div>
                        <div className="aside-item budget"><h3>Budget</h3><p>{addStyleToBudgetRevenue(budget)}$</p></div>
                        <div className="aside-item budget"><h3>Recette</h3><p>{revenue === 0 ? `-` : `${addStyleToBudgetRevenue(revenue)}$`}</p></div>
                        <ul className=" aside-item genres">
                            <h3>Genres</h3>
                            <div className="li-item">
                                { genres ? genres.map(genre => (<Link to={`genre/${genre.id}`} key={genre.id} onClick={clearMovies}>{genre.name}</Link>)) : null }
                            </div>
                        </ul>
                        <div className="aside-item popularity">
                            <h3>Popularité</h3>
                            <p>Le film à reçu {populaire} points pour {vote_count} vote.</p>
                        </div>
                    </aside>
                </div>
            </div>
        )
}
            


export default Movie
