import * as mui from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import BtAz from '../components/Bt/Az';
import BtBalisen from '../components/Bt/Balisen';
import BtIndusi from '../components/Bt/Indusi';
import TextInputComponent from '../components/textInput';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <mui.Typography variant='h1'>
          OCCM
        </mui.Typography>
        <br />
        <br />
        <mui.Typography variant='h5'>
          Bauteile
        </mui.Typography>
        <br />
        <mui.Select>
          {["Az", "Balisen", "LZB Schrank", "Indusi", "Bemerkung"].map(s =>
            <mui.MenuItem>
              {s}
            </mui.MenuItem>
          )}
        </mui.Select>
        <mui.Button variant='contained'>
          Hinzufügen
        </mui.Button>
        <br />
        <br />
        <br />

        <TextInputComponent />
        <mui.Popover open BackdropProps
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          transformOrigin={{ horizontal: "center", vertical: "top" }}>
          <mui.Box padding="30px">
            <BtBalisen />
            <br />
            <br />
            <mui.ButtonGroup fullWidth>
              <mui.Button color='inherit'>
                Abbrechen
              </mui.Button>
              <mui.Button variant='contained' color='success'>
                Speichern
              </mui.Button>
            </mui.ButtonGroup>
          </mui.Box>
        </mui.Popover>
      </div>
    );
  }
}

export default HomePage;
