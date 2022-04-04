import * as mui from '@mui/material';
import React from 'react';

import TextInputComponent from '../textInput';
import CheckBoxComponent from '../checkBox';

class BtLZB extends React.Component {
    constructor(props) {
        super(props);
        this.data = {
            btType: 'lzb',
            bezeichnung: '',
            NGmAB: false,
        };
    }

    dataChange(id, value) {
        this.data[id] = value;
        if (this.props.onChange) {
            this.props.onChange(this.data, this.data.bezeichnung !== '');
        } else {
            console.warn('BtLZB: onChange missing');
        }
    }

    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    LZB Schrank
                </mui.Typography>
                <br />
                <TextInputComponent autoFocus onChange={(text) => this.dataChange('bezeichnung', text)} />

                <CheckBoxComponent onChange={(check) => this.dataChange('NGmAB', check)}
                    label='Nachbargleis mit Außerbetrieb' />
            </>
        );
    }
}

export default BtLZB;