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
        <br />
        <Link to="/b">
          Testlink
        </Link>
        <br />
        <br />
        <mui.Typography variant='h5'>
          Bauteile
        </mui.Typography>
        <Link to="/az_bauteil">
          Az
        </Link>
        <br />
        <br />
        <br />

        <TextInputComponent />
      </div>
    );
  }
}

export default HomePage;
