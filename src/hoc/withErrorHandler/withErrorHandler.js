import React, { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null,
        };

        constructor(props){
            super(props);

            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                if( typeof error === 'string' ){
                    error = {
                        message: error,
                    };
                }else if( typeof error === 'object' ){
                    if( error.hasOwnProperty('response') ){
                        if( typeof error.response === 'object' && error.response.hasOwnProperty('data') ){
                            if( typeof error.response.data === 'object' && error.response.data.hasOwnProperty('error') ){
                                if( typeof error.response.data.error === 'object' && error.response.data.error.hasOwnProperty('message') ){
                                    error = error.response.data.error;
                                }
                            }
                        }
                    }
                }
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHanlder = () =>{
            this.setState({error: null})
        };

        render(){
            return (
                <Fragment>
                    <Modal show={this.state.error} onHide={this.errorConfirmedHanlder}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
            );
        }
    }
};

export default withErrorHandler;