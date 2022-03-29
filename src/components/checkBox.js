import * as mui from '@mui/material';
import React from 'react';


class CheckBoxComponent extends React.Component {
    render() {
        return (
            <>
                <mui.FormControlLabel control={<mui.Checkbox checked={this.props.CB}
                    onChange={(e) => this.handleCheckboxChange(e)} />}
                    label={this.props.labelCB} />
                <br />
            </>
        );
    }
}

export default CheckBoxComponent;
