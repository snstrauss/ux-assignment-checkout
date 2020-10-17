import React, { useState } from 'react';
import S from './PaymentMethod.module.scss';
import { FormLabel, InputLabel, TextField } from '@material-ui/core';
import StepForm from '../../StepForm/StepForm';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

const TODAY = new Date().toISOString().split('T')[0]

export default function PaymentMethod({ onNext, buttonText }) {

    const [selectedMethod, setSelectedMethod] = useState('credit');

    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState(TODAY);
    const [creditCode, setCreditCode] = useState('');

    const [paypalEmail, setPaypalEmail] = useState('');
    const [paypalPassword, setPaypalPassword] = useState('');

    function isValid() {
        return selectedMethod === 'credit'
            ?
            (cardNumber.length === 16 && expDate.length && creditCode.length)
            :
            selectedMethod === 'paypal'
                ?
                (paypalEmail.length && paypalPassword.length)
                :
                false;
    }

    return (
        <StepForm onNext={onNext} allowNext={isValid()} buttonText={buttonText}>
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
                            <TextField variant="outlined" type="number" className={S.creditNum}
                                label="Credit Card Number"
                                value={cardNumber} onChange={(ev) => setCardNumber(ev.target.value.substring(0, 16))} />
                            <div className={S.creditDetails}>
                                <div className={S.expInput}>
                                    <InputLabel className={S.dateLabel} shrink>Expiration Date</InputLabel>
                                    <TextField variant="outlined" type="date" className={S.exp}
                                        value={expDate} onChange={(ev) => setExpDate(ev.target.value)} />
                                </div>
                                <TextField variant="outlined" type="number" className={S.code}
                                    label="CSC"
                                    value={creditCode} onChange={(ev) => setCreditCode(ev.target.value.substring(0, 3))} />
                            </div>
                        </>
                        :
                        selectedMethod === 'paypal'
                            ?
                            <div className={S.paypal}>
                                <FormLabel className={S.label}>
                                    Paypal Credentials
                                </FormLabel>
                                <TextField className={S.field} variant="outlined" type="email"
                                    label="E-Mail"
                                    value={paypalEmail} onChange={(ev) => setPaypalEmail(ev.target.value)} />
                                <TextField className={S.field} variant="outlined" type="password"
                                    label="Password"
                                    value={paypalPassword} onChange={(ev) => setPaypalPassword(ev.target.value)} />
                            </div>
                            :
                            null
                }
            </div>
        </StepForm>
    );
}
