import * as mui from '@mui/material';
import React from 'react';

import TextInputComponent from '../textInput';
import CheckBoxComponent from '../checkBox';


class BtLZB extends React.Component {
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
                type: 'LZB',
                bezeichnung: this.state.text,
                NGmAB: this.state.NGmAB,
            });
        } else {
            console.warn('BtLZB: onChange missing');
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
                    LZB Schrank
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

export default BtLZB;