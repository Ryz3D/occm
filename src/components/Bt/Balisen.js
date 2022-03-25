import * as mui from '@mui/material';
import React from 'react';

class BtBalisen extends React.Component {
    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    Balisen
                </mui.Typography>
                <br />
                <mui.TextField fullWidth label='Bezeichnung' />
                <mui.FormControlLabel control={<mui.Checkbox/>} label='Nachbargleis mit Außerbetrieb'/>
            </>
        );
    }
}

export default BtBalisen;