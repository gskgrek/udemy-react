import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

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

const store = createStore( reducer, composeWithDevTools(
    applyMiddleware(logger, thunk),
));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path="/auth" component={Auth} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/checkout" component={Checkout} />
                            <Route path="/orders" component={Orders} />
                            <Route path="/" exact component={BurgerBuilder} />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
