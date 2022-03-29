import * as mui from '@mui/material';
import React from 'react';

import TextInputComponent from '../textInput';


class BtBemerkung extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    dataChange() {
        if (this.props.onChange) {
            this.props.onChange({
                type: 'Bemerkung',
                text: this.state.text,
            });
        } else {
            console.warn('BtBemerkung: onChange missing');
        }
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value,
        }, () => this.dataChange());
    }

    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    Bemerkung
                </mui.Typography>
                <br />
                <TextInputComponent fullWidth labelTextInput='Bezeichnung'
                    valueTextInput={this.state.text} onChangeTextInput={(e) => this.handleTextChange(e)} />
            </>
        );
    }
}

export default BtBemerkung;