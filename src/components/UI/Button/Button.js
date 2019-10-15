import React from 'react';

import css from './Button.module.scss';

const button = (props) => (
    <button
        className={[css.Button, css[props.type]].join(' ')}
        onClick={props.onClick}>
            {props.children}
    </button>
);

export default button;