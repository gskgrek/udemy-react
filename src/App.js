import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import * as actions from "./store/actions";

const Checkout = React.lazy( () => {
    return import('./containers/Checkout/Checkout');
});
const Orders = React.lazy( () => {
    return import('./containers/Orders/Orders');
});
const Auth = React.lazy( () => {
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

const app = () => {

    store.dispatch( actions.authCheckState() );

    let routes = (
        <Switch>
            <Route path="/auth" render={(props) => <Auth {...props}/>} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );

    if( store.getState().auth.token!==null ){
        routes = (
            <Switch>
                <Route path="/auth" render={(props) => <Auth {...props}/>} />
                <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
                <Route path="/orders" render={(props) => <Orders {...props}/>} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
            </Switch>
        );
    }

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
                </Layout>
            </BrowserRouter>
        </Provider>
    );

};

export default app;
