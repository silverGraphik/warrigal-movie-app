import React, { useReducer } from 'react';
import UsersContext from './usersContext';
import UsersReducer from './usersReducer';
import {
    LOGIN,
    LOGOUT,
    SIGNUP
} from '../types';

const UsersState = props => {
    const initialState = {
        login: [],
        logout: false,
        signup: []
    };

    const [state, dispatch] = useReducer(UsersReducer, initialState);

    const getInformation = () => {
        
    }
};

export default UsersState;