import * as mui from '@mui/material';
import React from 'react';


class CheckBoxComponent extends React.Component {
    render() {
        return (
            <>
                <mui.FormControlLabel control={<mui.Checkbox checked={this.props.CheckBox}
                    onChange={this.props.onChangeCheckBox} />}
                    label={this.props.labelCheckBox} />
                <br />
            </>
        );
    }
}

export default CheckBoxComponent;
