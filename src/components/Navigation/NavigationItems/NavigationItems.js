import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import css from './NavigationItems.module.scss'

const navigationItems = () => (
    <ul className={css.NavigationItems}>
        <NavigationItem url="/" active>Burger builder</NavigationItem>
        <NavigationItem url="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;