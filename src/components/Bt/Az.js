import * as mui from '@mui/material';
import React from 'react';

import TextInputComponent from '../textInput';

class BtAz extends React.Component {

    constructor(props) {
        super(props);
        this.data = {
            BTtype: 'Achszähler',
            bezeichnung: '',
        };
    }

    dataChange(id, value) {
        this.data[id] = value;
        if (this.props.onChange) {
            this.props.onChange(this.data, this.data.bezeichnung !== '');
        } else {
            console.warn('BtAz: onChange missing');
        }
    }

    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    Achszähler
                </mui.Typography>
                <br />
                <TextInputComponent onChange={(text) => this.dataChange('bezeichnung', text)} />
            </>
        );
    }
}

export default BtAz;