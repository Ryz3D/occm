import * as mui from '@mui/material';
import React from 'react';

import TextInputComponent from '../textInput';
import CheckBoxComponent from '../checkBox';

class BtIndusi extends React.Component {
    constructor(props) {
        super(props);
        this.data = {
            btType: 'indusi',
            bezeichnung: '',
            mitKabel: false,
        };
    }

    dataChange(id, value) {
        this.data[id] = value;
        if (this.props.onChange) {
            this.props.onChange(this.data, this.data.bezeichnung !== '');
        } else {
            console.warn('BtIndusi: onChange missing');
        }
    }

    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    Indusi
                </mui.Typography>
                <br />
                <TextInputComponent autoFocus onChange={(text) => this.dataChange('bezeichnung', text)} />

                <CheckBoxComponent onChange={(check) => this.dataChange('mitKabel', check)}
                    label='mit Kabel' />
            </>
        );
    }
}

export default BtIndusi;