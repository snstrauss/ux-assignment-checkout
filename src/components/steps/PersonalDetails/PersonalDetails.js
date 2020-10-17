import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import StepForm from '../../StepForm/StepForm';

export default function PersonalDetails(props) {

    const [name, setName] = useState();
    const [id, setId] = useState('');

    function isValid() {
        return name && name.length &&
            id && id.length === 9;
    }

    return (
        <StepForm {...props} allowNext={isValid()}>
            <TextField variant="outlined" type="text"
                label="Full Name"
                onChange={(ev) => setName(ev.target.value)} />
            <TextField variant="outlined" type="number"
                helperText="Fill in a 9 digit ID number, including Check Digit" label="ID"
                value={id}
                onChange={(ev) => setId(ev.target.value.substring(0, 9))} />
        </StepForm>
    );
}
