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

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleValueChange(event) {
    this.setState({
      value: event.target.value,
    }, () => this.props.onChange(this.state.value));
  }

  render() {
    return (
      <>
        <mui.TextField fullWidth label={this.props.label || 'Bezeichnung'}
          value={this.state.value} onChange={(e) => this.handleValueChange(e)} />
        <br />
      </>
    );
  }
}

export default TextInputComponent;
