import React, { useState } from 'react';
import S from './CheckoutSteps.module.scss';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

import StepIndicator from '../../components/StepIndicator/StepIndicator';

import PersonalDetails from '../../components/steps/PersonalDetails/PersonalDetails';
import DeliveryOptions from '../../components/steps/DeliveryOptions/DeliveryOptions';
import PaymentMethod from '../../components/steps/PaymentMethod/PaymentMethod';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import PaymentIcon from '@material-ui/icons/Payment';

import TagFacesIcon from '@material-ui/icons/TagFaces';

const steps = [{
    title: 'Personal Details',
    form: PersonalDetails,
    icon: AccountCircleIcon
}, {
    title: 'Delivery Options',
    form: DeliveryOptions,
    icon: HomeIcon
}, {
    title: 'Payment Method',
    form: PaymentMethod,
    icon: PaymentIcon,
    buttonText: 'Finish'
}];

export default function CheckoutSteps() {

    const [currentStep, setStep] = useState(0);
    const [doneSteps, setDoneSteps] = useState(new Set());

    function goToStep(nextStep, direct) {
        if (direct && !doneSteps.has(nextStep)) {
            return;
        }

        setStep(nextStep);
    }

    function done(idx) {
        addStepToDone(idx);
        goToStep(idx + 1);
    }

    function addStepToDone(stepIdx) {
        const newDoneSet = new Set(doneSteps);
        newDoneSet.add(stepIdx);

        setDoneSteps(newDoneSet)
    }

    function finishedAllSteps() {
        return currentStep === steps.length;
    }

    return (
        <div className={S.container}>
            <div className={S.indicator}>
                <StepIndicator allSteps={steps} currentStep={currentStep} goToStep={goToStep} />
            </div>
            <div className={S.steps}>
                {
                    steps.map((step, idx) => {

                        const StepForm = step.form;
                        const stepIsDone = doneSteps.has(idx);

                        return (
                            <Accordion key={step.title} expanded={currentStep === (idx)}>
                                <AccordionSummary className={stepIsDone ? 'done-step' : undefined} onClick={() => goToStep(idx, true)}>
                                    <Typography>
                                        {step.title}
                                    </Typography>
                                    {
                                        stepIsDone &&
                                        <DoneIcon />
                                    }
                                </AccordionSummary>
                                <AccordionDetails>
                                    <StepForm onNext={() => done(idx)} buttonText={step.buttonText} />
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </div>
            {
                finishedAllSteps() &&
                <div className={S.happyIconContainer}>
                    <TagFacesIcon />
                </div>
            }
        </div>
    );
}
