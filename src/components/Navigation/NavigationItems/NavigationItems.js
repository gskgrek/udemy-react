import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import css from './NavigationItems.module.scss'

const navigationItems = () => (
    <ul className={css.NavigationItems}>
        <NavigationItem url="/" exact>Burger builder</NavigationItem>
        <NavigationItem url="/checkout">Checkout</NavigationItem>
        <NavigationItem url="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;