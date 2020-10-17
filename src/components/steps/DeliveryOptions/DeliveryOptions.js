import React, { useState } from 'react';
import S from './DeliveryOptions.module.scss';
import { Button, FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Select } from '@material-ui/core';
import StepForm from '../../StepForm/StepForm';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import FormField from '../../FormField/FormField';

const usStates = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",
    "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR",
    "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];

export default function DeliveryOptions(props) {

    const [selectedMethod, setSelectedMethod] = useState('pickup');

    const [street, setStreet] = useState('');
    const [streetIsValid, setStreetValid] = useState();

    const [city, setCity] = useState('');
    const [cityIsValid, setCityValid] = useState();

    const [state, setUserState] = useState('');
    const [stateIsValid, setStateValid] = useState();
    const [touchedState, setTouchedState] = useState(false);

    function validateState() {
        setTouchedState(true);
        setStateValid(!!state.length)
    }

    function isStateInvalid() {
        return touchedState
            ? !state.length
            : false;
    }

    function isValid() {
        return selectedMethod === 'pickup'
            ? true
            : selectedMethod === 'delivery'
                ? [streetIsValid, cityIsValid, stateIsValid].every(v => v)
                : false;
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
                                <div className={S.street}>
                                    <FormField
                                        wide={true}
                                        label="Street Address"
                                        onChange={setStreet}
                                        setValidation={setStreetValid}
                                        defaultValue={street}
                                    />
                                </div>
                                <div className={S.cityState}>
                                    <div className={S.city}>
                                        <FormField
                                            wide={true}
                                            label="City"
                                            onChange={setCity}
                                            setValidation={setCityValid}
                                            defaultValue={city}
                                        />
                                    </div>
                                    <div className={S.spacer}>

                                    </div>
                                    <FormControl className={S.state} variant="outlined" onBlur={validateState} error={isStateInvalid()}>
                                        <InputLabel>State</InputLabel>
                                        <Select value={state} label="State" onChange={(ev) => setUserState(ev.target.value)} >
                                            {
                                                usStates.map(state => (
                                                    <MenuItem key={state} value={state}>
                                                        {state}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        {
                                            (stateIsValid === false) &&
                                            <FormHelperText className={S.helper}>
                                                Required
                                            </FormHelperText>
                                        }
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
