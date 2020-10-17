import React from 'react';
import S from './Checkout.module.scss';
import CheckoutSteps from './screens/CheckoutSteps/CheckoutSteps';

import './checkout.scss';

export default function Checkout() {
    return (
        <div className={S.container}>
            <CheckoutSteps />
        </div>
    );
}
