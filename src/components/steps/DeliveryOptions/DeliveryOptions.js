import React, { useState } from 'react';
import S from './DeliveryOptions.module.scss';
import { Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import StepForm from '../../StepForm/StepForm';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

const usStates = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",
    "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR",
    "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];

export default function DeliveryOptions(props) {

    const [selectedMethod, setSelectedMethod] = useState('pickup');

    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setUserState] = useState('');

    function isValid() {
        return selectedMethod === 'pickup' ||
            ((selectedMethod === 'delivery') &&
                street.length && city.length && state.length);

    }

    return (
        <StepForm {...props} allowNext={isValid()}>
            <div className={S.container}>
                <ToggleButtonGroup className={S.toggle} exclusive value={selectedMethod} onChange={(ev, selectedMethod) => setSelectedMethod(selectedMethod)} >
                    <ToggleButton value="pickup">
                        Pick it up Yourself
                    </ToggleButton>
                    <ToggleButton value="delivery">
                        Quick Delivery
                    </ToggleButton>
                </ToggleButtonGroup>
                {
                    selectedMethod === 'pickup'
                        ?
                        <Button className={S.findStore} variant="contained" color="primary">
                            Find a Store<br />Close to You
                        </Button>
                        :
                        selectedMethod === 'delivery'
                            ?
                            <>
                                <FormLabel className={S.label}>
                                    Address for Delivery
                                </FormLabel>
                                <TextField className={S.street} variant="outlined" type="text" label="Street Address"
                                    rowsMax={3}
                                    value={street} onChange={(ev) => setStreet(ev.target.value)} />
                                <div className={S.cityState}>
                                    <TextField className={S.city} variant="outlined" type="text" label="City"
                                        value={city} onChange={(ev) => setCity(ev.target.value)} />
                                    <FormControl className={S.state} variant="outlined">
                                        <InputLabel>State</InputLabel>
                                        <Select value={state} label="State" onChange={(ev) => setUserState(ev.target.value)}>
                                            {
                                                usStates.map(state => (
                                                    <MenuItem key={state} value={state}>
                                                        {state}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </>
                            :
                            null
                }
            </div>
        </StepForm>
    );
}
