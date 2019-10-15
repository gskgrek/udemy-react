import React from 'react';

import css from './DrawerToggle.module.scss';

const drawerToggle = (props) => (
    <div
        className={css.DrawerToggle}
        onClick={props.onClick}>
            <div/>
            <div/>
            <div/>
    </div>
);

export default drawerToggle;
