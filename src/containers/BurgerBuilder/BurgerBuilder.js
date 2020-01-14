import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Template from '../../hoc/Template/Template';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';

import axios from '../../axios-orders';

const burgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false);

    const {ingredients, totalPrice, error, isAuthenticated} = useSelector( (state) => {
        return {
            ingredients: state.burgerBuilder.ingredients,
            totalPrice: state.burgerBuilder.totalPrice,
            error: state.burgerBuilder.error,
            isAuthenticated: state.auth.token !== null,
        }
    });

    const dispatch = useDispatch();
    const onIngredientAdded = (ingredientName) => dispatch( actions.addIngredient(ingredientName) );
    const onIngredientRemoved = (ingredientName) => dispatch( actions.removeIngredient(ingredientName) );
    const onInitIngredients = useCallback( () => dispatch( actions.initIngedients() ), [] ); // prevent function reecreation on render
    const onInitPurchase = () => dispatch( actions.purchaseInit() );
    const onSetAuthRedirectPath = (path) => dispatch( actions.setAuthRedirectPath(path) );

    useEffect( () => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    };

    const purchaseHandler = () => {
        if( isAuthenticated ) {

            setPurchasing(true);

        }else{

            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');

        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push({
            pathname: '/checkout',
        });
    };



    const disableInfo = {
        ...ingredients
    };
    for( let key in disableInfo ){
        disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded :(</p> : <Spinner/>;

    if( ingredients){

        orderSummary = <OrderSummary
            ingredients={ingredients}
            totalPrice={totalPrice}
            onContinue={purchaseContinueHandler}
            onCancel={purchaseCancelHandler}/>;

        burger = (
            <Fragment>
                <Burger ingredients={ingredients} />
                <BuildControls
                    disabled={disableInfo}
                    price={totalPrice}
                    purchasable={updatePurchaseState(ingredients)}
                    isAuth={isAuthenticated}
                    onOrder={purchaseHandler}
                    onIngredientAdd={onIngredientAdded}
                    onIngredientRemove={onIngredientRemoved}/>
            </Fragment>
        );

    }

    return (
        <Template>

            <Modal show={purchasing} onHide={purchaseCancelHandler}>
                {orderSummary}
            </Modal>

            {burger}

        </Template>
    );

};

export default withErrorHandler(burgerBuilder, axios);