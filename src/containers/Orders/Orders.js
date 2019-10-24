import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component{

    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then( response => {
                const orders = [];
                for( let id in response.data ){
                    orders.push( {
                        id: id,
                        ...response.data[id]
                    });
                }
                this.setState({loading: false, orders: orders});
            })
            .catch( () => {
                this.setState({loading: false});
            });
    }

    render (){
        return (
            <div>
                <Order/>
                <Order/>
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);