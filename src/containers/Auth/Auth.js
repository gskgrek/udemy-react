import React, { useState, useEffect } from 'react';
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

const auth = (props) => {

    const [controls, setControls] = useState({
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
    });
    const [isSignUp, setIsSignUp] = useState(false);

    const { onSetAuthRedirectPath, building, redirectPath } = props;

    useEffect( () => {
        if( !building && redirectPath !== "/" ){
            onSetAuthRedirectPath("/");
        }
    }, [onSetAuthRedirectPath, building, redirectPath]);

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...controls,
            [inputIdentifier]: {
                ...controls[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[inputIdentifier].validation),
                touched: true,
            }
        };

        setControls(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    };



    const formElementsArray = [];
    for( let key in controls ){
        if( controls.hasOwnProperty(key) ) {
            formElementsArray.push({id: key, config: controls[key]});
        }
    }

    let form = (
        <form onSubmit={submitHandler}>
            {formElementsArray.map( (formElement) => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={!!formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button type="Success">SUBMIT</Button>
            <Button button={true} type="Danger" onClick={switchAuthModeHandler}>SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
        </form>
    );

    if( props.loading ){
        form = <Spiner/>;
    }

    if( props.isAuthenticated ){
        form = <Redirect to={props.redirectPath} />;
    }

    return(
        <div className={css.Auth}>
            <h4>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h4>
            <h4>Enter your Data</h4>
            {form}
        </div>
    );

};

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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(auth, axios));