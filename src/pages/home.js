import * as mui from '@mui/material';
import React from 'react';
import BasicUIComponent from '../components/basicUI';
//import { Link } from 'react-router-dom';

//import TextInputComponent from '../components/textInput';
import BtAz from '../components/Bt/Az';
import BtBalisen from '../components/Bt/Balisen';
import BtBemerkung from '../components/Bt/Bemerkungen'
import BtIndusi from '../components/Bt/Indusi';
import BtLZB from '../components/Bt/LZB';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBT: 0,
      BtPOopen: false,
      currentBTdata: null,
      canSaveBT: false,
    };
  }

  handleBTSelect(event) {
    this.setState({
      selectedBT: event.target.value,
    });
  }

  handleBTAdd() {
    this.setState({
      BtPOopen: true,
      currentBTdata: null,
    });
  }

  handleBTPOClose() {
    this.setState({
      BtPOopen: false,
      canSave: false,
    });
  }

  handleBTData(data, canSave) {
    this.setState({
      currentBTdata: data,
      canSaveBT: canSave,
    });
  }

  handleBTPOSave() {
    this.setState({
      BtPOopen: false,
      canSave: false,
    });
    console.log(this.state.currentBTdata); //TO DO: Daten in Liste speichern
  }

  render() {
    return (
      <BasicUIComponent>
        <mui.Typography variant='h4'>
          Bauteile
        </mui.Typography>

        <br />
        <br />

        <mui.Grid container>
          <mui.Grid item xs>
            <mui.Select fullWidth value={this.state.selectedBT} onChange={(e) => this.handleBTSelect(e)}>
              {['Az', 'Balisen', 'LZB Schrank', 'Indusi', 'Bemerkung'].map((s, i) =>
                <mui.MenuItem value={i}>
                  {s}
                </mui.MenuItem>
              )}
            </mui.Select>
          </mui.Grid>

          <mui.Grid item alignItems="stretch" style={{ display: "flex" }}>
            <mui.Button variant='contained' onClick={() => this.handleBTAdd()}>
              Hinzufügen
            </mui.Button>
          </mui.Grid>
        </mui.Grid>

        <mui.Popover open={this.state.BtPOopen} BackdropProps
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}>
          <mui.Box padding='30px' width='80vw'>
            {this.state.selectedBT === 0 && <BtAz onChange={(d, c) => this.handleBTData(d, c)} />}
            {this.state.selectedBT === 1 && <BtBalisen onChange={(d, c) => this.handleBTData(d, c)} />}
            {this.state.selectedBT === 2 && <BtLZB onChange={(d, c) => this.handleBTData(d, c)} />}
            {this.state.selectedBT === 3 && <BtIndusi onChange={(d, c) => this.handleBTData(d, c)} />}
            {this.state.selectedBT === 4 && <BtBemerkung onChange={(d, c) => this.handleBTData(d, c)} />}
            <br />
            <br />
            <mui.ButtonGroup fullWidth>
              <mui.Button color='inherit' onClick={() => this.handleBTPOClose()}>
                Abbrechen
              </mui.Button>
              <mui.Button variant='contained' color='success' onClick={() => this.handleBTPOSave()}
                disabled={!this.state.canSaveBT}>
                Speichern
              </mui.Button>
            </mui.ButtonGroup>
          </mui.Box>
        </mui.Popover>

        <br />
        <br />
        <br />
        <br />

        <mui.Button fullWidth variant='contained'>
          PDF erstellen
        </mui.Button>
      </BasicUIComponent>
    );
  }
}

export default HomePage;