import { Functions as FunctionsIcon } from '@mui/icons-material';
import * as mui from '@mui/material';
import React from 'react';
import BasicUIComponent from '../components/basicUI';
import DatePicker from "react-datepicker";
import "./react-datepicker.css";

import BtAz from '../components/Bt/Az';
import BtBalisen from '../components/Bt/Balisen';
import BtBemerkung from '../components/Bt/Bemerkungen'
import BtIndusi from '../components/Bt/Indusi';
import BtLZB from '../components/Bt/LZB';
import TableViewComponent from '../components/tableView';
import PDFDownloadComponent from '../components/pdfDownload';

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
        date: new Date(),
        bt: [],
      },
      tablePOfilter: '',
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
      currentDocData.date = new Date(currentDocData.date);
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

  handleDateChange(date) {
    const tempData = this.state.docData;
    tempData.date = date;
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
    const tempData = JSON.parse(JSON.stringify(this.state.docData));    //Daten aus dem State ziehen
    const tempBTdata1 = JSON.parse(JSON.stringify(this.state.currentBTdata));   //neue BTDaten dupliziert unabhängig
    tempBTdata1.id = tempData.bt.length;    //individuelle ID für das BT aus der Länge
    tempData.bt.push(tempBTdata1);    //BTObjekt wird DocData hinzugefügt
    if (this.state.currentBTdata.btType === 'balisen' && this.state.currentBTdata.gruppe) {
      const tempBTdata2 = JSON.parse(JSON.stringify(this.state.currentBTdata));
      tempBTdata2.id = tempData.bt.length;
      tempBTdata2.bezeichnung += ' II';
      tempData.bt.push(tempBTdata2);
    }
    tempData.date = new Date(tempData.date);
    this.setState({
      BtPOopen: false,
      canSaveBT: false,
      docData: tempData,
    }, () => this.saveDoc());
  }

  handleTablePOopen(btType) {
    this.setState({
      tablePOfilter: btType,
    });
  }

  handleTablePOclose() {
    this.setState({
      tablePOfilter: '',
    });
  }

  handleTableDelete(id) {
    const tempData = JSON.parse(JSON.stringify(this.state.docData));
    tempData.bt = tempData.bt.filter((bt) => bt.id !== id);
    for (var i in tempData.bt) {
      tempData.bt[i].id = +i;
    }
    tempData.date = new Date(tempData.date);
    this.setState({
      docData: tempData,
    }, () => this.saveDoc());
  }


  render() {
    return (
      <BasicUIComponent>

        <br />
        <br />
        <br />

        <mui.TextField fullWidth label='Baustellenname' onChange={(e) => this.handleTitleChange(e)}
          value={this.state.docData.title} />

        <br />
        <br />

        <mui.FormLabel>
          Datum:
        </mui.FormLabel>
        <div style={{ display: 'inline-block', marginLeft: '10px' }} >
          <DatePicker dateFormat='d.M.yyyy' shouldCloseOnSelect
            selected={this.state.docData.date} onChange={(d) => this.handleDateChange(d)} />
        </div>

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
          <mui.Popover open={this.state.tablePOfilter !== ''} BackdropProps
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
            onClose={() => this.handleTablePOclose()}>
            <mui.Box padding='30px' width='80vw' height='80vh'>
              <TableViewComponent
                docData={this.state.docData}
                filter={this.state.tablePOfilter}
                onDelete={(id) => this.handleTableDelete(id)} />
            </mui.Box>
          </mui.Popover>
        </mui.ThemeProvider>

        <br />

        <mui.Typography>
          <mui.Table>
            <mui.TableRow>
              <mui.TableCell>
                <mui.Typography variant='h6'>Bauteilanzahl</mui.Typography>
              </mui.TableCell>
              <mui.TableCell />
            </mui.TableRow>
            <mui.TableRow hover onClick={() => this.handleTablePOopen('az')} style={{ cursor: 'pointer' }}>
              <mui.TableCell>
                Achszähler
              </mui.TableCell>
              <mui.TableCell>
                {this.state.docData.bt.filter((bt) => bt.btType === 'az').length}
              </mui.TableCell>
            </mui.TableRow>
            <mui.TableRow hover onClick={() => this.handleTablePOopen('balisen')} style={{ cursor: 'pointer' }}>
              <mui.TableCell>
                Balisen
              </mui.TableCell>
              <mui.TableCell>
                {this.state.docData.bt.filter((bt) => bt.btType === 'balisen').length}
              </mui.TableCell>
            </mui.TableRow>
            <mui.TableRow hover onClick={() => this.handleTablePOopen('lzb')} style={{ cursor: 'pointer' }}>
              <mui.TableCell>
                LZB Schrank
              </mui.TableCell>
              <mui.TableCell>
                {this.state.docData.bt.filter((bt) => bt.btType === 'lzb').length}
              </mui.TableCell>
            </mui.TableRow>
            <mui.TableRow hover onClick={() => this.handleTablePOopen('indusi')} style={{ cursor: 'pointer' }}>
              <mui.TableCell>
                Indusi
              </mui.TableCell>
              <mui.TableCell>
                {this.state.docData.bt.filter((bt) => bt.btType === 'indusi').length}
              </mui.TableCell>
            </mui.TableRow>
            <mui.TableRow hover onClick={() => this.handleTablePOopen('bemerkung')} style={{ cursor: 'pointer' }}>
              <mui.TableCell>
                Bemerkungen
              </mui.TableCell>
              <mui.TableCell>
                {this.state.docData.bt.filter((bt) => bt.btType === 'bemerkung').length}
              </mui.TableCell>
            </mui.TableRow>
            <mui.TableRow hover onClick={() => this.handleTablePOopen('*')} style={{ cursor: 'pointer' }}>
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

        <mui.Button fullWidth variant='outlined'>
          PDF-Vorschau
        </mui.Button>

        <br />
        <br />

        <PDFDownloadComponent />

        <br />
        <br />
      </BasicUIComponent>
    );
  }
}

export default HomePage;