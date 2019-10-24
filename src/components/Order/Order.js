import React from 'react';

import css from './order.module.scss';
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const order = (props) => {
    const ingredients = [];

    for( let ingredientName in props.ingredients ){
        ingredients.push( {
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map( ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                padding: '5px',
                border: '1px solid #ccc',
            }}
        key={ig.name}>{ig.name} ({ig.amount})</span>
    });

    return (
        <div className={css.Order}>
            <p>
                Ingredients: {ingredientOutput}
            </p>
            <p>
                Price: <b>$ {(+props.price).toFixed(2)}</b>
            </p>
        </div>
    );
};

export default order;