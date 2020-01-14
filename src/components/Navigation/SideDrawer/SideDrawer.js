import React from 'react';

import Template from '../../../hoc/Template/Template';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import css from './SideDrawer.module.scss';

const sideDrawer = (props) => {

    const classes = [css.SideDrawer, props.show ? css.Open : css.Close];

    return (
        <Template>

            <Backdrop show={props.show} onClick={props.onClose}/>

            <div className={classes.join(' ')} onClick={props.onClose}>
                <div className={css.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>

        </Template>
    );
};

export default sideDrawer;