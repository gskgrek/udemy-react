import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import css from './CheckoutSummary.module.scss';

const checkoutSummary = (props) => {

    return(
        <div className={css.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button type="Danger" onClick>CANCEL</Button>
            <Button type="Success" onClick>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;