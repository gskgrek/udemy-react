import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectPath: '/',
};

const authStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true,
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false,
    }
};

const authFailed = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    }
};

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null,
    }
};

const setAuthRedirectPath = (state, action) => {
    return{
        ...state,
        redirectPath: action.path,
    }
};

const reducer = (state=initialState, action) => {

    switch (action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    }

};

export default reducer;