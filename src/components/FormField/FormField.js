import React, { useState } from 'react';
import S from './FormField.module.scss';
import { TextField } from '@material-ui/core';

const plainValue = (val) => val;
const plainValidation = (val) => !!val.length;

export default function FormField({ type = 'text', label = '',
    onChange, validation = plainValidation,
    setValidation, formatValue = plainValue,
    errorText = 'Required Field', helperText = '',
    wide = false, defaultValue = 'hey' }) {


    const [value, setValue] = useState(defaultValue);
    const [valid, setIsValid] = useState(true);

    function change(ev) {

        const val = formatValue(ev.target.value);

        setValue(val);
        onChange(val);

        if (!valid) {
            validate(val);
        }
    }

    function validate(valueToValidate) {
        const isFieldValid = validation(valueToValidate);
        setIsValid(isFieldValid)
        setValidation(isFieldValid);
    }

    return (
        <div className={S.container}>
            <TextField variant="outlined" type={type} className={`${S.field} ${wide ? S.wide : ''}`}
                value={value}
                label={label}
                onChange={change}
                onBlur={() => validate(value)}
                error={!valid}
                helperText={valid ? helperText : errorText}
            />
        </div>
    );
}
