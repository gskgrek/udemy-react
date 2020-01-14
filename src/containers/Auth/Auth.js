import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spiner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import {checkValidity} from '../../utils/utils';

import * as css from './Auth.module.scss';

class Auth extends Component{

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                },
                valid: false,
                touched: false,
            },
        },
        isSignUp: false,
    };

    componentDidMount(){
        if( !this.props.building && this.props.redirectPath !== "/" ){
            this.props.onSetAuthRedirectPath("/");
        }
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true,
            }
        };

        this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return {
                isSignUp: !prevState.isSignUp,
            }
        });
    };

    render(){
        const formElementsArray = [];
        for( let key in this.state.controls ){
            formElementsArray.push( {id: key, config: this.state.controls[key]} );
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map( (formElement) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={!!formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button type="Success">SUBMIT</Button>
                <Button button={true} type="Danger" onClick={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </form>
        );

        if( this.props.loading ){
            form = <Spiner/>;
        }

        if( this.props.isAuthenticated ){
            form = <Redirect to={this.props.redirectPath} />;
        }

        return(
            <div className={css.Auth}>
                <h4>{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</h4>
                <h4>Enter your Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        redirectPath: state.auth.redirectPath,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch( actions.auth(email, password, isSignUp) ),
        onSetAuthRedirectPath: (path) => dispatch( actions.setAuthRedirectPath(path) ),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));