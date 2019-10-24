import React from 'react';

import css from './input.module.scss';

const input = (props) => {
    let inputElement = null;

    const inputClasses = [css.InputElement];

    if( props.touched && props.shouldValidate && props.invalid ){
        inputClasses.push(css.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case 'textarea':
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} />;
            break;
        case 'select':
            inputElement = (
                <select className={inputClasses.join(' ')} onChange={props.changed}>
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