import * as mui from '@mui/material';
import React from 'react';

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

    handleNGmABChange(event) {
        this.setState({
            NGmAB: event.target.checked,
        }, () => this.dataChange());
    }

    render() {
        return (
            <>
                <mui.Typography variant='h4'>
                    Balisen
                </mui.Typography>
                <br />
                <mui.TextField fullWidth label='Bezeichnung'
                    value={this.state.text} onChange={(e) => this.handleTextChange(e)} />
                <mui.FormControlLabel control={<mui.Checkbox checked={this.state.NGmAB}
                    onChange={(e) => this.handleNGmABChange(e)} />}
                    label='Nachbargleis mit Außerbetrieb' />
            </>
        );
    }
}

export default BtBalisen;