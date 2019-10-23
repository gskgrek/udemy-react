import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import css from './ContactData.module.scss';

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: '',
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
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch( error => {
                this.setState({loading: false});
            });

        return false;
    };

    render() {
        let form = (
            <form>
                <input className={css.Input} type="text" name="name" placeholder="Your name" />
                <input className={css.Input} type="email" name="email" placeholder="Your email" />
                <input className={css.Input} type="text" name="street" placeholder="Street" />
                <input className={css.Input} type="text" name="postal" placeholder="Postal code" />
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