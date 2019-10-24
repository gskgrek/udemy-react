import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import css from './ContactData.module.scss';

class ContactData extends Component{

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: 'Jan Kowalski',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                value: 'nie@ma.pl',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: 'Uliczka',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code',
                },
                value: '00-00',
            },
            country: {
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
                value: 'Poland',
            },
            deliveryMethod: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Delivery method',
                },
                value: 'fastest',
            },
        },
        loading: false,
        price: 0,
    };

    orderHandler = (e) => {
        e.preventDefault();

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,

        };
        axios.post('/orders.json', order)
            .then( response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch( error => {
                this.setState({loading: false});
            });

        return false;
    };

    render() {
        const formElementsArray = [];
        for( let key in this.state.orderForm ){
            formElementsArray.push( {id: key, config: this.state.orderForm[key]} );
        }

        let form = (
            <form>
                {formElementsArray.map( (formElement) => (
                    <Input key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} />
                ))}
                <Button type="Success" onClick={this.orderHandler}>ORDER</Button>
            </form>
        );
        if( this.state.loading ){
            form = <Spinner/>;
        }

        return(
            <div className={css.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;