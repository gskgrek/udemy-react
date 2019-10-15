import React from 'react';

import css from './Backdrop.module.scss';

const backdrop = (props) => (
    props.show ? <div className={css.Backdrop} onClick={props.onClick}></div> : null
);

export default backdrop;