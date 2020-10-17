import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';
import S from './StepIndicator.module.scss';

export default function StepIndicator({ allSteps, currentStep, goToStep }) {



    function StepIcon({ icon, completed, active }) {
        const Icon = allSteps[icon - 1].icon;
        const classes = `${S.icon} ${active ? S.activeIcon : ''} ${completed ? S.doneIcon : ''}`;

        return <Icon className={classes} onClick={() => goToStep(icon - 1, true)} />
    }

    return (
        <div className={S.container}>
            <Stepper alternativeLabel activeStep={currentStep}>
                {
                    allSteps.map((step) => {
                        return (
                            <Step key={step.title}>
                                <StepLabel StepIconComponent={StepIcon} />
                            </Step>
                        )
                    })
                }
            </Stepper>
        </div>
    );
}
