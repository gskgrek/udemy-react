import React from 'react';

import css from './input.module.scss';

const input = (props) => {
    let inputElement = null;

    switch (props.inputtype) {
        case 'input':
            inputElement = <input className={css.InputElement} {...props} />;
            break;
        case 'textarea':
            inputElement = <textarea className={css.InputElement} {...props} />;
            break;
        default:
            inputElement = <input className={css.InputElement} {...props} />;
    }

    return (
        <div className={css.Input}>
            <label className={css.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;