import * as mui from '@mui/material';
import React from 'react';

class TextInputComponent extends React.Component {
  render() {
    return (
      <>
        <mui.TextField fullWidth label='Hier kommt was rein' variant='filled' />
        <br />
        <mui.Button fullWidth variant='contained'>
          OK
        </mui.Button>
      </>
    );
  }
}

export default TextInputComponent;
