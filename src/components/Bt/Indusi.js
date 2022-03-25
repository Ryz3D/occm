import * as mui from '@mui/material';
import React from 'react';

class BtIndusi extends React.Component {
    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    Indusi
                </mui.Typography>
                <br />
                <mui.TextField fullWidth label='Bezeichnung' />
                <mui.FormControlLabel control={<mui.Checkbox/>} label='mit Kabel'/>
            </>
        );
    }
}

export default BtIndusi;