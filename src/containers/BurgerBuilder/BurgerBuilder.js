import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import Template from '../../hoc/Template/Template';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';

import axios from '../../axios-orders';

class BurgerBuilder extends Component{

    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
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
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
        });
    };

    render(){

        const disableInfo = {
            ...this.props.ingredients
        };
        for( let key in disableInfo ){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded :(</p> : <Spinner/>;

        if( this.props.ingredients){

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}
                onContinue={this.purchaseContinueHandler}
                onCancel={this.purchaseCancelHandler}/>;

            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        disabled={disableInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        onOrder={this.purchaseHandler}
                        onIngredientAdd={this.props.onIngredientAdded}
                        onIngredientRemove={this.props.onIngredientRemoved}/>
                </Fragment>
            );

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

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.order.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch( actions.addIngredient(ingredientName) ),
        onIngredientRemoved: (ingredientName) => dispatch( actions.removeIngredient(ingredientName) ),
        onInitIngredients: () => dispatch( actions.initIngedients() ),
        onInitPurchase: () => dispatch( actions.purchaseInit() ),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));