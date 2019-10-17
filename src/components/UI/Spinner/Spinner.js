import React from 'react';

import css from './Spinner.module.scss';

const spinner = () => {
    return (
        <div className={css.Spinner}>Loading...</div>
    );
};

export default spinner;