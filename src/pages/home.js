import * as mui from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <mui.Typography variant='h1'>
          HALLO ICH BIN MIRCO
        </mui.Typography>
        <Link to="/b">
          Fick mich
        </Link>
      </div>
    );
  }
}

export default HomePage;
