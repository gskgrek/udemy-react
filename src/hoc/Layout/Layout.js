import React, { useState } from 'react';
import { connect } from 'react-redux';

import css from './Layout.module.scss';
import Template from '../Template/Template';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    };

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    return(
        <Template>
            <Toolbar onDrawerToggleClick={sideDrawerToggleHandler} isAuth={props.isAuthenticated}/>
            <SideDrawer show={showSideDrawer} onClose={sideDrawerCloseHandler} isAuth={props.isAuthenticated}/>
            <main className={css.Content}>
                {props.children}
            </main>
        </Template>
    );

};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
};

export default connect(mapStateToProps)(layout);