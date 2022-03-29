import * as mui from '@mui/material';
import React from 'react';

import CheckBoxComponent from '../checkBox';
import TextInputComponent from '../textInput';


class BtBalisen extends React.Component {
    constructor(props) {
        super(props);
        this.data = {
            BTtype: 'Balisen',
            bezeichnung: '',
            NGmAB: false,
        };
    }

    dataChange(id, value) {
        this.data[id] = value;
        if (this.props.onChange) {
            this.props.onChange(this.data, this.data.bezeichnung !== '');
        } else {
            console.warn('BtBalisen: onChange missing');
        }
    }

    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    Balisen
                </mui.Typography>
                <br />
                <TextInputComponent onChange={(text) => this.dataChange('bezeichnung', text)} />

                <CheckBoxComponent onChange={(check) => this.dataChange('NGmAB', check)}
                    label='Nachbargleis mit Außerbetrieb' />
            </>
        );
    }
}

export default BtBalisen;