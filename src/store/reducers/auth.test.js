import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

    it('should return the initial state', () => {
        const expectedState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: '/',
        };

        expect( reducer(undefined, {}) ).toEqual(expectedState);
    });

    it('should store the token upon login', ()=>{
        const initialState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: '/',
        };

        const payload = {
            type: actionTypes.AUTH_SUCCESS,
            token: 'testtoken',
            userId: 16,
        };

        const expectedState = {
            token: 'testtoken',
            userId: 16,
            error: null,
            loading: false,
            redirectPath: '/',
        };

        expect( reducer(initialState, payload) ).toEqual(expectedState);
    });

});