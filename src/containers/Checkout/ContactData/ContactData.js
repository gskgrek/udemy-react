import React, { useState } from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../../store/actions/index';
import {checkValidity} from '../../../utils/utils';

import css from './ContactData.module.scss';

const contactData = (props) => {

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP code',
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 6,
            },
            valid: false,
            touched: false,
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {
                        value: 'fastest', displayValue: 'Fastest',
                    },
                    {
                        value: 'cheapest', displayValue: 'Cheapest',
                    }
                ]
            },
            value: 'fastest',
            valid: true,
            touched: false,
        },
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (e) => {
        e.preventDefault();

        const formData = {};
        for( let formElementIdentifier in orderForm ){
            if( orderForm.hasOwnProperty(formElementIdentifier) ) {
                formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
            }
        }

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId,
        };

        props.onOrderBurger(order, props.token);

        return false;
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let isValid = true;
        for( let inputIdentifier in updatedOrderForm ){
            isValid = updatedOrderForm[inputIdentifier].valid && isValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(isValid);
    };


    const formElementsArray = [];
    for( let key in orderForm ){
        if( orderForm.hasOwnProperty(key) ) {
            formElementsArray.push({id: key, config: orderForm[key]});
        }
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map( (formElement) => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={!!formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button type="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if( props.loading ){
        form = <Spinner/>;
    }

    return(
        <div className={css.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch( actions.purchaseBurger(orderData, token) ),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));