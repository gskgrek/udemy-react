import React from 'react';

import Template from '../../../hoc/Template/Template';
import Button from '../../../components/UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
        });

    return(
        <Template>
            <h3>Your order</h3>
            <p>Lorem ipsum burger</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button type="Danger" onClick={props.onCancel}>CANCEL</Button>
            <Button type="Success" onClick={props.onContinue}>CONTINUE</Button>
        </Template>
    );
};

export default orderSummary;
