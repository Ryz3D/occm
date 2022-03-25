import * as mui from '@mui/material';
import React from 'react';

class BtBemerkung extends React.Component {
    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    Bemerkung
                </mui.Typography>
                <br />
                <mui.TextField fullWidth label='Bezeichnung' />
            </>
        );
    }
}

export default BtBemerkung;