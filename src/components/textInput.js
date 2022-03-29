import * as mui from '@mui/material';
import React from 'react';

/*

beispiel profilseite
 -> textinputs edit oder display mode prop
 -> image upload
 -> save profile data in localstorage

 -> class
 -> constructor
 -> didmount
 -> state
 -> props
 -> data object (in state)
 -> JSON
 -> localstorage
 -> image base64, blob

*/

class TextInputComponent extends React.Component {
  render() {
    return (
      <>
        <mui.TextField fullWidth label={this.props.labelTextInput} 
        value={this.props.valueTextInput} onChange={this.props.onChangeTextInput} />
        <br />
      </>
    );
  }
}

export default TextInputComponent;
