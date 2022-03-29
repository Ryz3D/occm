import * as mui from '@mui/material';
import React from 'react';

import TextInputComponent from '../textInput';


class BtAz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    dataChange() {
        if (this.props.onChange) {
            this.props.onChange({
                type: 'Achszähler',
                bezeichnung: this.state.text,
            });
        } else {
            console.warn('BtAz: onChange missing');
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
                    Achszähler
                </mui.Typography>
                <br />
                <TextInputComponent fullWidth labelTextInput='Bezeichnung'
                    valueTextInput={this.state.text} onChangeTextInput={(e) => this.handleTextChange(e)} />
            </>
        );
    }
}

export default BtAz;