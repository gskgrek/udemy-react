import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import css from './Toolbar.module.scss';

const toolbar = (props) => (
    <header className={css.Toolbar}>

        <DrawerToggle onClick={props.onDrawerToggleClick}/>

        <div className={css.Logo}>
            <Logo/>
        </div>

        <nav className={css.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>

    </header>
);

export default toolbar;