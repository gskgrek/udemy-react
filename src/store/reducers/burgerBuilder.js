import * as actions from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    };
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    };
};

const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
    };
};

const fetchIngredientsFailed = (state, action) => {
    return {
        ...state,
        error: true,
    };
};


const reducer = (state=initialState, action) => {

    switch( action.type ){

        case actions.ADD_INGREDIENT: return addIngredient(state, action);
        case actions.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actions.SET_INGREDIENTS: return setIngredients(state, action);
        case actions.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default:
            return state;
    }

};

export default reducer;