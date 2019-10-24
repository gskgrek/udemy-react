import React from 'react';

import css from './order.module.scss';

const order = (props) => {
    return (
        <div className={css.Order}>
            <p>
                Ingredients: Salad (1)
            </p>
            <p>
                Price: <b>$ 5.45</b>
            </p>
        </div>
    );
};

export default order;