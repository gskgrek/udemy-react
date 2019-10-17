import React, { Component } from 'react';

import Template from '../../hoc/Template/Template';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
};

class BurgerBuilder extends Component{

    state = {

        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
    };

    addIngredientHandler = (type) => {

        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type]++;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        }, this.updatePurchaseState);

    };

    removeIngredientHandler = (type) => {

        if( this.state.ingredients[type] <= 0 ){
            return;
        }

        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type]--;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        }, this.updatePurchaseState);

    };

    updatePurchaseState(){
        const ingredients = {
            ...this.state.ingredients
        };

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({
            purchasable: sum > 0
        });
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    };

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: 'Jan Kowalski',
                address: {
                    street: 'Uliczka',
                    zipCode: '00-00',
                    country: 'Poland',
                },
                email: 'nie@ma.pl',
            },
            deliveryMethod: 'fastes',
        };
        axios.post('/orders.json', order)
            .then( response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch( error => {
                this.setState({loading: false, purchasing: false});
            });
    };

    render(){

        const disableInfo = {
            ...this.state.ingredients
        };
        for( let key in disableInfo ){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            onContinue={this.purchaseContinueHandler}
            onCancel={this.purchaseCancelHandler}/>;
        if( this.state.loading ){
            orderSummary = <Spinner/>;
        }

        return (
            <Template>

                <Modal show={this.state.purchasing} onHide={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                <Burger ingredients={this.state.ingredients} />

                <BuildControls
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    onOrder={this.purchaseHandler}
                    onIngredientAdd={this.addIngredientHandler}
                    onIngredientRemove={this.removeIngredientHandler}/>

            </Template>
        );

    }

}

export default withErrorHandler(BurgerBuilder, axios);