import * as mui from '@mui/material';
import React from 'react';

import TextInputComponent from '../textInput';

class BtBemerkung extends React.Component {
    constructor(props) {
        super(props);
        this.data = {
            btType: 'bemerkung',
            bezeichnung: '',
        };
    }

    dataChange(id, value) {
        this.data[id] = value;
        if (this.props.onChange) {
            this.props.onChange(this.data, this.data.bezeichnung !== '');
        } else {
            console.warn('BtBemerkung: onChange missing');
        }
    }
    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    Bemerkung
                </mui.Typography>
                <br />
                <TextInputComponent onChange={(text) => this.dataChange('bezeichnung', text)} />
            </>
        );
    }
}

export default BtBemerkung;