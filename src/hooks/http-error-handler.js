import { useState, useEffect } from 'react';

export default (axios) => {

    const [error, setError] = useState(null);

    const requestInterceptor = axios.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const responseInterceptor = axios.interceptors.response.use(res => res, err => {
        if( typeof err === 'string' ){
            err = {
                message: err,
            };
        }else if( typeof err === 'object' ){
            if( err.hasOwnProperty('response') ){
                if( typeof err.response === 'object' && err.response.hasOwnProperty('data') ){
                    if( typeof err.response.data === 'object' && err.response.data.hasOwnProperty('error') ){
                        if( typeof err.response.data.error === 'object' && err.response.data.error.hasOwnProperty('message') ){
                            err = err.response.data.error;
                        }
                    }
                }
            }
        }
        setError(err);
    });

    useEffect( () => {
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () =>{
        setError(null);
    };


    return [error, errorConfirmedHandler];

}