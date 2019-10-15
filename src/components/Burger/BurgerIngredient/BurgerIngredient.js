import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './BurgerIngredient.module.scss';

class BurgerIngredient extends Component{

    render(){

        let ingredient = null;

        switch( this.props.type ){

            case "bread-bottom":
                ingredient = <div className={css.BreadBottom} />;
                break;

            case 'bread-top':
                ingredient = (
                    <div className={css.BreadTop}>
                        <div className={css.Seeds1} />
                        <div className={css.Seeds2} />
                    </div>
                );
                break;

            case 'meat':
                ingredient = <div className={css.Meat} />;
                break;

            case 'cheese':
                ingredient = <div className={css.Cheese} />;
                break;

            case 'salad':
                ingredient = <div className={css.Salad} />;
                break;

            case 'bacon':
                ingredient = <div className={css.Bacon} />;
                break;

            default:
                ingredient = null;

        }

        return ingredient;

    }

}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired,
};

export default BurgerIngredient;