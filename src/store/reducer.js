import * as actions from './actions';

const initialState = {
    ingredients: null,
    totalPrice: 4,
};

const reducer = (state=initialState, action) => {

    switch( action.type ){
        case actions.ADD_INGREDIENT:
            return state;
        case actions.REMOVE_INGREDIENT:
            return state;
    }

    return state;
};

export default reducer;