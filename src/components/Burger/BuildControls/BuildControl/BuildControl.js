import React from 'react';

import css from './BuildControl.module.scss';

const buildControl = (props) => (
    <div className={css.BuildControl}>
        <div className={css.Label}>{props.label}</div>
        <button
            className={css.Less}
            onClick={props.onRemove}
            disabled={props.disabled}>
                Less
        </button>
        <button
            className={css.More}
            onClick={props.onAdd}>
                More
        </button>
    </div>
);

export default buildControl;