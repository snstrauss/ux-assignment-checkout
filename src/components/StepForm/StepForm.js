import React from 'react';
import S from './StepForm.module.scss';
import { Button } from '@material-ui/core';

export default function StepForm({ children, onNext, allowNext, buttonText = 'Next' }) {

    function nextClicked(ev) {
        ev.stopPropagation();
        onNext();
    }

    return (
        <div className={S.container}>
            {children}

            <Button className={S.next} variant="contained" color="primary" disabled={!allowNext} onClick={(ev) => nextClicked(ev)}>
                {buttonText}
            </Button>
        </div>
    );
}
