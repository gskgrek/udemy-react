import React from 'react';

import css from './input.module.scss';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case 'input':
            inputElement = <input className={css.InputElement} {...props.elementConfig} value={props.value} />;
            break;
        case 'textarea':
            inputElement = <textarea className={css.InputElement} {...props.elementConfig} />;
            break;
        case 'select':
            inputElement = (
                <select className={css.InputElement}>
                    {props.elementConfig.options.map( option => <option key={option.value} value={option.value}>{option.displayValue}</option> )}
                </select>
            );
            break;
        default:
            inputElement = <input className={css.InputElement} {...props.elementConfig} />;
    }

    return (
        <div className={css.Input}>
            <label className={css.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;