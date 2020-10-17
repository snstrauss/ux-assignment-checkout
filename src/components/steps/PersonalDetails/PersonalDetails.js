import React, { useState } from 'react';
import StepForm from '../../StepForm/StepForm';
import FormField from '../../FormField/FormField';

export default function PersonalDetails(props) {

    const [name, setName] = useState('');
    const [nameIsValid, setNameValid] = useState();

    const [id, setId] = useState('');
    const [idIsValid, setIdValid] = useState();

    const formatId = (newId) => newId.substring(0, 9);
    const idValidation = (idToValidate) => idToValidate.length === 9;

    const isValid = () => [nameIsValid, idIsValid].every(valid => valid);

    return (
        <StepForm {...props} allowNext={isValid()}>
            <FormField
                label="Full Name"
                onChange={setName}
                setValidation={setNameValid}
                defaultValue={name}
            />
            <FormField
                type="number"
                label="ID"
                onChange={setId}
                formatValue={formatId}
                validation={idValidation}
                setValidation={setIdValid}
                helperText="Fill in a 9 digit ID number, including Check Digit"
                errorText="ID Needs to be 9 digits long"
                defaultValue={id}
            />
        </StepForm>
    );
}
