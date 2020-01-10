import React, { Component } from 'react';
import { connect } from 'react-redux';

import css from './Layout.module.scss';
import Template from '../Template/Template';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    };

    sideDrawerToggleHandler = () => {

        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };

    render(){

        return(
            <Template>
                <Toolbar onDrawerToggleClick={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated}/>
                <SideDrawer show={this.state.showSideDrawer} onClose={this.sideDrawerCloseHandler} isAuth={this.props.isAuthenticated}/>
                <main className={css.Content}>
                    {this.props.children}
                </main>
            </Template>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
};

export default connect(mapStateToProps)(Layout);