import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import * as actions from "./store/actions";

const asyncCheckout = asyncComponent( () => {
    return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent( () => {
    return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent( () => {
    return import('./containers/Auth/Auth');
});

const logger = (store) => {
    return (next) => {
        return (action) => {
            console.log( '[Middleware] Dispatching', action );
            const  result = next(action);
            console.log( '[Middleware] next state', store.getState() );
            return result;
        }
    }
};

const reducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer,
});

let enhancer = applyMiddleware(logger, thunk);

if( process.env.NODE_ENV === 'development' ){
    enhancer = composeWithDevTools(enhancer);
}

const store = createStore( reducer, enhancer);

class App extends Component {

    render() {
        store.dispatch( actions.authCheckState() );

        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if( store.getState().auth.token!==null ){
            routes = (
                <Switch>
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                </Switch>
            );
        }

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        {routes}
                    </Layout>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
