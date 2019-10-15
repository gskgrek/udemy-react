import React, { Component } from 'react';

import Template from '../../../hoc/Template/Template';
import BackDrop from '../Backdrop/Backdrop';

import css from './Modal.module.scss';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show;
    }

    render(){
        return (
            <Template>

                <BackDrop show={this.props.show} onClick={this.props.onHide}/>

                <div
                    className={css.Modal}
                    style={{
                        transform: this.props.show ? 'translate(-50%, -50%)' : 'translate(-50%, -100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}>
                    {this.props.children}
                </div>

            </Template>
        );
    }
}

export default Modal;
