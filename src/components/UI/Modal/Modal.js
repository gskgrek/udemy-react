import React from 'react';

import Template from '../../../hoc/Template/Template';
import BackDrop from '../Backdrop/Backdrop';

import css from './Modal.module.scss';

const modal = (props) => {

    return (
        <Template>

            <BackDrop show={props.show} onClick={props.onHide}/>

            <div
                className={css.Modal}
                style={{
                    transform: props.show ? 'translate(-50%, -50%)' : 'translate(-50%, -125vh)',
                    opacity: props.show ? '1' : '0',
                }}>
                {props.children}
            </div>

        </Template>
    );
};

export default React.memo(modal, (prevProps, nextProps) => {
    return ( nextProps.show === prevProps.show && nextProps.children === prevProps.children );
});
