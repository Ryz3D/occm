import { Functions as FunctionsIcon } from '@mui/icons-material';
import * as mui from '@mui/material';
import React from 'react';
import BasicUIComponent from '../components/basicUI';

import BtAz from '../components/Bt/Az';
import BtBalisen from '../components/Bt/Balisen';
import BtBemerkung from '../components/Bt/Bemerkungen'
import BtIndusi from '../components/Bt/Indusi';
import BtLZB from '../components/Bt/LZB';
import TableViewComponent from '../components/tableView';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBT: 0,
      BtPOopen: false,
      currentBTdata: null,
      canSaveBT: false,
      docData: {
        version: '1.0',
        title: '',
        bt: [],
      },
      tablePOopen: false,
    };
    this.theme = mui.createTheme({
      palette: {
        mode: 'light',
      },
    });
  }

  componentDidMount() {
    this.reloadDoc();
  }

  reloadDoc() {
    this.currentDoc = parseInt(localStorage.getItem('currentDoc') || '0');
    const currentDocData = JSON.parse(localStorage.getItem('doc' + this.currentDoc) || '{}');
    if (Object.keys(currentDocData).length !== 0) {
      this.setState({
        docData: currentDocData,
      });
    }
  }

  saveDoc() {
    localStorage.setItem('doc' + this.currentDoc, JSON.stringify(this.state.docData));
  }

  handleTitleChange(event) {
    const tempData = this.state.docData;
    tempData.title = event.target.value;
    this.setState({
      docData: tempData,
    }, () => this.saveDoc());
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
      canSaveBT: false,
    });
  }

  handleBTData(data, canSave) {
    this.setState({
      currentBTdata: data,
      canSaveBT: canSave,
    });
  }

  handleBTPOSave() {
    const tempData = this.state.docData;
    const tempBTdata1 = JSON.parse(JSON.stringify(this.state.currentBTdata));
    tempBTdata1.id = tempData.bt.length;
    tempData.bt.push(tempBTdata1);
    if (this.state.currentBTdata.btType === 'balisen' && this.state.currentBTdata.gruppe) {
      const tempBTdata2 = JSON.parse(JSON.stringify(this.state.currentBTdata));
      tempBTdata2.id = tempData.bt.length;
      tempBTdata2.bezeichnung += ' II';
      tempData.bt.push(tempBTdata2);
    }
    this.setState({
      BtPOopen: false,
      canSaveBT: false,
      docData: tempData,
    }, () => this.saveDoc());
  }

  handleTablePOopen() {
    this.setState({
      tablePOopen: true,
    });
  }

  handleTablePOclose() {
    this.setState({
      tablePOopen: false,
    });
  }

  render() {
    return (
      <BasicUIComponent>
        <mui.Typography variant='h4'>
          Bauteile
        </mui.Typography>

        <br />
        <br />

        <mui.TextField fullWidth label='Baustellenname' onChange={(e) => this.handleTitleChange(e)}
          value={this.state.docData.title} />
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
        <mui.ThemeProvider theme={this.theme}>
          <mui.Popover open={this.state.tablePOopen} BackdropProps
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
            onClose={() => this.handleTablePOclose()}>
            <mui.Box padding='30px' width='80vw' height='80vh'>
              <TableViewComponent docData={this.state.docData} />
            </mui.Box>
          </mui.Popover>
        </mui.ThemeProvider>

        <br />
        <br />

        <mui.Typography>
          <mui.Table>
            <mui.TableRow>
              <mui.TableCell>
                <mui.Typography variant='h6'>Bauteilanzahl</mui.Typography>
              </mui.TableCell>
              <mui.TableCell />
            </mui.TableRow>
            <mui.TableRow hover>
              <mui.TableCell>
                Achszähler
              </mui.TableCell>
              <mui.TableCell>
                {this.state.docData.bt.filter((bt) => bt.btType === 'az').length}
              </mui.TableCell>
            </mui.TableRow>
            <mui.TableRow hover>
              <mui.TableCell>
                Balisen
              </mui.TableCell>
              <mui.TableCell>
                {this.state.docData.bt.filter((bt) => bt.btType === 'balisen').length}
              </mui.TableCell>
            </mui.TableRow>
            <mui.TableRow hover>
              <mui.TableCell>
                LZB Schrank
              </mui.TableCell>
              <mui.TableCell>
                {this.state.docData.bt.filter((bt) => bt.btType === 'lzb').length}
              </mui.TableCell>
            </mui.TableRow>
            <mui.TableRow hover>
              <mui.TableCell>
                Indusi
              </mui.TableCell>
              <mui.TableCell>
                {this.state.docData.bt.filter((bt) => bt.btType === 'indusi').length}
              </mui.TableCell>
            </mui.TableRow>
            <mui.TableRow hover>
              <mui.TableCell>
                Bemerkungen
              </mui.TableCell>
              <mui.TableCell>
                {this.state.docData.bt.filter((bt) => bt.btType === 'bemerkung').length}
              </mui.TableCell>
            </mui.TableRow>
            <mui.TableRow hover>
              <mui.TableCell style={{
                display: 'flex',
                alignItems: 'self-end'
              }}>
                <FunctionsIcon />
                <div>
                  Bauteile
                </div>
              </mui.TableCell>
              <mui.TableCell>
                {this.state.docData.bt.filter((bt) => bt.btType !== 'bemerkung').length}
              </mui.TableCell>
            </mui.TableRow>
          </mui.Table>
        </mui.Typography>

        <br />
        <br />

        <mui.Button fullWidth variant='outlined' onClick={() => this.handleTablePOopen()}>
          PDF-Vorschau
        </mui.Button>

        <br />
        <br />

        <mui.Button fullWidth variant='contained'>
          PDF erstellen
        </mui.Button>
      </BasicUIComponent >
    );
  }
}

export default HomePage;