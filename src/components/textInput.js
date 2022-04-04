import * as mui from '@mui/material';
import React from 'react';

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
        <mui.TextField autoFocus={this.props.autoFocus} fullWidth label={this.props.label || 'Bezeichnung'}
          value={this.state.value} onChange={(e) => this.handleValueChange(e)} />
        <br />
      </>
    );
  }
}

export default TextInputComponent;
