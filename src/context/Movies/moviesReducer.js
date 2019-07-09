import {
    SEARCH_MOVIES,
    SET_LOADING,
    CLEAR_MOVIES,
    GET_MOVIE,
    SEARCH_QUERY_SEND,
    INITIAL_LIST_OF_MOVIES,
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case INITIAL_LIST_OF_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false,
                searchQuerySend: false
            }
        case SEARCH_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false,
                searchQuerySend: false,
            }
        case GET_MOVIE:
            return {
                ...state,
                movie: action.payload,
                loading: false
            }
        case CLEAR_MOVIES:
            return {
                ...state,
                movies: action.payload,
                movie: {},
                loading: false,
                searchQuerySend: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SEARCH_QUERY_SEND:
            return {
                ...state,
                searchQuerySend: true
            }
        
        default:
            return state;
    }
}