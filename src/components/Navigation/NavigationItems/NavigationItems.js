import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import css from './NavigationItems.module.scss'

const navigationItems = (props) => (
    <ul className={css.NavigationItems}>
        <NavigationItem url="/" exact>Burger builder</NavigationItem>
        {props.isAuth ? <NavigationItem url="/checkout">Checkout</NavigationItem> : null}
        {props.isAuth ? <NavigationItem url="/orders">Orders</NavigationItem> : null}
        {!props.isAuth ? <NavigationItem url="/auth">Authenticate</NavigationItem> : <NavigationItem url="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;