import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import css from './ContactData.module.scss';

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: '',
        },
    };

    render() {
        return(
            <div className={css.ContactData}>
                <h4>Enter your Contact Data</h4>
                <from>
                    <input className={css.Input} type="text" name="name" placeholder="Your name" />
                    <input className={css.Input} type="email" name="email" placeholder="Your email" />
                    <input className={css.Input} type="text" name="street" placeholder="Street" />
                    <input className={css.Input} type="text" name="postal" placeholder="Postal code" />
                    <Button type="Success">ORDER</Button>
                </from>
            </div>
        );
    }
}

export default ContactData;