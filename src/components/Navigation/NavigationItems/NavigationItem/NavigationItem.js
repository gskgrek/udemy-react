import React from 'react';

import css from './NavigationItem.module.scss';

const navigationItem = (props) => (
    <li className={css.NavigationItem}>
        <a
            className={props.active ? css.active : null}
            href={props.url}>
                {props.children}
        </a>
    </li>
);

export default navigationItem;