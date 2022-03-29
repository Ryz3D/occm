import * as mui from '@mui/material';
import React from 'react';

class CheckBoxComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: false,
        };
    }

    handleValueChange(event) {
        this.setState({
            value: event.target.checked,
        }, () => this.props.onChange(this.state.value));
    }

    render() {
        return (
            <>
                <mui.FormControlLabel control={<mui.Checkbox checked={this.state.value}
                    onChange={(e) => this.handleValueChange(e)} />}
                    label={this.props.label} />
                <br />
            </>
        );
    }
}

export default CheckBoxComponent;
