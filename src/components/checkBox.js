import * as mui from '@mui/material';
import React from 'react';

class CheckBoxComponent extends React.Component {
    render() {
        return (
            <>
                <mui.FormControlLabel 
                    label='Nachbargleis mit Außerbetrieb' />
                <br />
            </>
        );
    }
}

export default CheckBoxComponent;
