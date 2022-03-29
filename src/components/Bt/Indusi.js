import * as mui from '@mui/material';
import React from 'react';

import TextInputComponent from '../textInput';
import CheckBoxComponent from '../checkBox';


class BtIndusi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            mitKabel: false,
        };
    }

    dataChange() {
        if (this.props.onChange) {
            this.props.onChange({
                type: 'Indusi',
                bezeichnung: this.state.text,
                mitKabel: this.state.mitKabel,
            });
        } else {
            console.warn('BtIndusi: onChange missing');
        }
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value,
        }, () => this.dataChange());
    }

    handleCheckboxChange(event) {
        this.setState({
            mitKabel: true,
        });
    }

    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    Indusi
                </mui.Typography>
                <br />
                <TextInputComponent fullWidth labelTextInput='Bezeichnung'
                    valueTextInput={this.state.text} onChangeTextInput={(e) => this.handleTextChange(e)} />

                <CheckBoxComponent CheckBox={this.state.mitKabel}
                    onChangeCheckBox={(e) => this.handleCheckboxChange(e)}
                    labelCheckBox='mit Kabel' />
            </>
        );
    }
}

export default BtIndusi;