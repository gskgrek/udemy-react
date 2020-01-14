import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import css from './BuildControls.module.scss';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={css.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => {
            return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                onAdd={() => props.onIngredientAdd(ctrl.type)}
                onRemove={() => props.onIngredientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>;
        })}
        <button
            className={css.OrderButton}
            disabled={!props.purchasable}
            onClick={props.onOrder}>
            {props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
        </button>
    </div>
);

export default buildControls;