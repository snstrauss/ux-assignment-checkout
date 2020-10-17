import React from 'react';
import S from './FinishedIconStep.module.scss';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { Grow } from '@material-ui/core';

export default function FinishedIconStep() {
    return (
        <div className={S.happyIconContainer}>
            <Grow timeout={2000} in={true}>
                <TagFacesIcon fontSize="large" />
            </Grow>
        </div>
    );
}
