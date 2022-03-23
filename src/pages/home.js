import * as mui from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import TextInputComponent from '../components/textInput';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <mui.Typography variant='h1'>
          OCCM
        </mui.Typography>
        <Link to="/b">
          Testlink
        </Link>
        <br />
        <br />

        <TextInputComponent />
      </div>
    );
  }
}

export default HomePage;
