import * as mui from '@mui/material';
import React from 'react';

import CheckBoxComponent from '../checkBox';
import TextInputComponent from '../textInput';


class BtBalisen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            NGmAB: false,  //Nachbargleis mit Außerbetrieb
        };
    }

    dataChange() {
        if (this.props.onChange) {
            this.props.onChange({
                type: 'Balisen',
                bezeichnung: this.state.text,
                NGmAB: this.state.NGmAB,
            });
        } else {
            console.warn('BtBalisen: onChange missing');
        }
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value,
        }, () => this.dataChange());
    }

    handleCheckboxChange(event) {
        this.setState({
            NGmAB: true,
        });
    }

    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    Balisen
                </mui.Typography>
                <br />
                <TextInputComponent fullWidth labelTextInput='Bezeichnung'
                    valueTextInput={this.state.text} onChangeTextInput={(e) => this.handleTextChange(e)} />

                <CheckBoxComponent CheckBox={this.state.NGmAB}
                    onChangeCheckBox={(e) => this.handleCheckboxChange(e)}
                    labelCheckBox='Nachbargleis mit Außerbetrieb' />
            </>
        );
    }
}

export default BtBalisen;