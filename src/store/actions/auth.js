import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId,
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error,
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch( logout() );
        }, expirationTime * 1000);
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch( authStart() );
        const data = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBT3mB7JUT0w37tD9ZRTtFwUe9iZX-Os3k';
        if( !isSignUp ){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBT3mB7JUT0w37tD9ZRTtFwUe9iZX-Os3k';
        }

        axios.post(url, data)
            .then( response => {
                dispatch( authSuccess(response.data) );
                dispatch( checkAuthTimeout(response.data.expiresIn) );
            })
            .catch( error => {
                dispatch( authFailed(error) );
            });
    }
};