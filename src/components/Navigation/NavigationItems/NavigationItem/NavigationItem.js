import React from 'react';
import { NavLink } from 'react-router-dom';

import css from './NavigationItem.module.scss';

const navigationItem = (props) => (
    <li className={css.NavigationItem}>
        <NavLink exact={props.exact} to={props.url} activeClassName={css.active}>
                {props.children}
        </NavLink>
    </li>
);

export default navigationItem;