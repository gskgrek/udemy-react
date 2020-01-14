import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
};

export const authSuccess = (authData) => {
    const expirationDate = new Date( new Date().getTime() + authData.expiresIn * 1000 );
    localStorage.setItem('token', authData.idToken);
    localStorage.setItem('userId', authData.localId);
    localStorage.setItem('expirationDate', expirationDate.getTime());
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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
};

export const setAuthRedirectPath = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch( logout() );
        }, expirationTime * 1000);
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if( !token ){
            dispatch( logout() );
        }else {
            const userId = localStorage.getItem('userId');
            const expirationStamp = localStorage.getItem('expirationDate');
            const expirationDate = new Date(parseInt(expirationStamp));
            const nowDate = new Date();
            let expiresIn = (expirationDate.getTime() - nowDate.getTime());
            if (expiresIn < 0) {
                dispatch( logout() );
            } else {
                expiresIn = Math.floor( expiresIn / 1000 );
                const authData = {
                    idToken: token,
                    localId: userId,
                    expiresIn: expiresIn,
                };
                dispatch(authSuccess(authData));
                dispatch(checkAuthTimeout(expiresIn));
            }
        }
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