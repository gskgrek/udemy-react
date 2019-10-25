import React, {Component, Fragment} from 'react';

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
        ingredients: null,
        totalPrice: 4,
        
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        axios.get('https://udemy-react-fd94e.firebaseio.com/ingredients.json')
            .then( response => {
                this.setState({ingredients: response.data});
                this.updatePurchaseState();
            })
            .catch( error => {
                this.setState({error: true});
            });
    }

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
        const queryParams = [];
        for( let i in this.state.ingredients ){
            queryParams.push( encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) );
        }
        queryParams.push('price=' + this.state.totalPrice);

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&'),
        });
    };

    render(){

        const disableInfo = {
            ...this.state.ingredients
        };
        for( let key in disableInfo ){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded :(</p> : <Spinner/>;

        if( this.state.ingredients){

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                onContinue={this.purchaseContinueHandler}
                onCancel={this.purchaseCancelHandler}/>;

            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        onOrder={this.purchaseHandler}
                        onIngredientAdd={this.addIngredientHandler}
                        onIngredientRemove={this.removeIngredientHandler}/>
                </Fragment>
            );

        }

        if( this.state.loading ){
            orderSummary = <Spinner/>;
        }

        return (
            <Template>

                <Modal show={this.state.purchasing} onHide={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}

            </Template>
        );

    }

}

export default withErrorHandler(BurgerBuilder, axios);