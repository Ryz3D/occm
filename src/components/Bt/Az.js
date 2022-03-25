import * as mui from '@mui/material';
import React from 'react';

class BtAz extends React.Component {
    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    Achszähler
                </mui.Typography>
                <br />
                <mui.TextField fullWidth label='Bezeichnung' />
                <mui.FormControlLabel control={<mui.Checkbox/>} label='mit Kabel'/>
            </>
        );
    }
}

export default BtAz;