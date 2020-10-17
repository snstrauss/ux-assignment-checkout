import React, { useState } from 'react';
import S from './PaymentMethod.module.scss';
import { FormLabel, InputLabel } from '@material-ui/core';
import StepForm from '../../StepForm/StepForm';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import FormField from '../../FormField/FormField';

const TODAY = new Date().toISOString().split('T')[0];
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const noop = () => { };

export default function PaymentMethod(props) {

    const [selectedMethod, setSelectedMethod] = useState('credit');

    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberIsValid, setCardNumberValid] = useState();

    const [expDate, setExpDate] = useState(TODAY);
    const [expDateIsValid, setExpDateValid] = useState();
    noop(expDateIsValid);

    const [creditCode, setCreditCode] = useState('');
    const [creditCodeIsValid, setCreditCodeValid] = useState();

    const [paypalEmail, setPaypalEmail] = useState('');
    const [emailIsValid, setEmailValid] = useState();

    const [paypalPassword, setPaypalPassword] = useState('');
    const [passwordIsValid, setPasswordValid] = useState();

    const formatCreditNumber = (number) => number.substring(0, 16);
    const validateCardNumber = (number) => number.length === 16;

    const formatCodeValue = (code) => code.substring(0, 3);
    const validateCodeValue = (code) => code.length === 3;

    const validateEmail = (email) => EMAIL_REGEX.test(email.toLowerCase());

    const creditDetailsValid = () => [cardNumberIsValid, creditCodeIsValid].every(v => v);
    const paypalDetailsIsValid = () => [emailIsValid, passwordIsValid].every(v => v);

    const isValid = () => {
        return selectedMethod === 'credit'
            ? creditDetailsValid()
            : selectedMethod === 'paypal'
                ? paypalDetailsIsValid()
                : false;
    }

    return (
        <StepForm {...props} allowNext={isValid()}>
            <div className={S.container}>
                <ToggleButtonGroup className={S.toggle} exclusive value={selectedMethod} onChange={(ev, selectedMethod) => setSelectedMethod(selectedMethod)} >
                    <ToggleButton value="credit">
                        Credit Card
                    </ToggleButton>
                    <ToggleButton value="paypal">
                        Paypal
                    </ToggleButton>
                </ToggleButtonGroup>
                {
                    selectedMethod === 'credit'
                        ?
                        <>
                            <FormLabel className={S.label}>
                                Credit Card Details
                            </FormLabel>
                            <div className={S.creditNum}>
                                <FormField
                                    wide={true}
                                    label="Credit Card Number"
                                    type="number"
                                    onChange={setCardNumber}
                                    formatValue={formatCreditNumber}
                                    validation={validateCardNumber}
                                    setValidation={setCardNumberValid}
                                    errorText="Enter a 16 Digit Card Number"
                                    defaultValue={cardNumber}
                                />
                            </div>
                            <div className={S.creditDetails}>
                                <div className={S.expInput}>
                                    <InputLabel className={S.dateLabel} shrink>Expiration Date</InputLabel>
                                    <div className={S.exp}>
                                        <FormField
                                            wide={true}
                                            type="date"
                                            onChange={setExpDate}
                                            setValidation={setExpDateValid}
                                            defaultValue={expDate}
                                        />
                                    </div>
                                </div>
                                <div className={S.code}>
                                    <FormField
                                        wide={true}
                                        type="number"
                                        label="CSC"
                                        onChange={setCreditCode}
                                        formatValue={formatCodeValue}
                                        validation={validateCodeValue}
                                        setValidation={setCreditCodeValid}
                                        errorText="3 Digit Code"
                                        defaultValue={creditCode}
                                    />
                                </div>
                            </div>
                        </>
                        :
                        selectedMethod === 'paypal'
                            ?
                            <div className={S.paypal}>
                                <FormLabel className={S.label}>
                                    Paypal Credentials
                                </FormLabel>
                                <div className={S.field}>
                                    <FormField
                                        wide={true}
                                        type="email"
                                        label="E-Mail"
                                        onChange={setPaypalEmail}
                                        validation={validateEmail}
                                        setValidation={setEmailValid}
                                        errorText="Required E-mail Format: your@email.com"
                                        defaultValue={paypalEmail}
                                    />
                                </div>
                                <div className={S.field}>
                                    <FormField
                                        wide={true}
                                        type="password"
                                        label="Password"
                                        onChange={setPaypalPassword}
                                        setValidation={setPasswordValid}
                                        defaultValue={paypalPassword}
                                    />
                                </div>
                            </div>
                            :
                            null
                }
            </div>
        </StepForm>
    );
}
