import {
  Functions as FunctionsIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import * as mui from '@mui/material';
import React from 'react';
import BasicUIComponent from '../components/basicUI';
import DatePicker from "react-datepicker";
import "./react-datepicker.css";
import routerLocation from '../wrapper/routerLocation';
import routerNavigate from '../wrapper/routerNavigate';

import BtAz from '../components/Bt/Az';
import BtBalisen from '../components/Bt/Balisen';
import BtBemerkung from '../components/Bt/Bemerkungen'
import BtIndusi from '../components/Bt/Indusi';
import BtLZB from '../components/Bt/LZB';
import TableViewComponent from '../components/tableView';
import PDFDownloadComponent from '../components/pdfDownload';
import PDFViewComponent from '../components/pdfView';

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
      previewOpen: false,
      downloadURL: '',
      btImageData: '',
    };
    this.theme = mui.createTheme({
      palette: {
        mode: 'light',
      },
    });
    this.currentDoc = 0;

    this.cameraFileRef = React.createRef();
    this.downloadRef = React.createRef();
    this.jsonFileRef = React.createRef();
  }

  componentDidUpdate() {
    this.loadCurrentDoc();
  }

  componentDidMount() {
    this.loadCurrentDoc();
  }

  loadCurrentDoc() {
    const urlSearch = new URLSearchParams(this.props.location.search);
    var newCurrentDoc = parseInt(urlSearch.get('id') || localStorage.getItem('currentDoc') || '1');
    if (this.currentDoc !== newCurrentDoc) {
      localStorage.setItem('currentDoc', newCurrentDoc.toString());
      this.currentDoc = newCurrentDoc;
      this.reloadDoc();
    }
  }

  reloadDoc() {
    const currentDocData = JSON.parse(localStorage.getItem('doc' + this.currentDoc) || '{}');
    if (Object.keys(currentDocData).length !== 0) {
      currentDocData.date = new Date(currentDocData.date);
      this.setState({
        docData: currentDocData,
      });
    }
    else {
      this.setState({
        docData: {
          version: '1.0',
          title: '',
          date: new Date(),
          bt: [],
        },
      }, () => {
        localStorage.setItem('doc' + this.currentDoc, JSON.stringify(this.state.docData));
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
    const tempData = JSON.parse(JSON.stringify(this.state.docData));
    const tempBTdata1 = JSON.parse(JSON.stringify(this.state.currentBTdata));
    tempBTdata1.id = tempData.bt.length;
    tempBTdata1.image = this.state.btImageData;
    tempData.bt.push(tempBTdata1);
    if (this.state.currentBTdata.btType === 'balisen' && this.state.currentBTdata.gruppe) {
      const tempBTdata2 = JSON.parse(JSON.stringify(this.state.currentBTdata));
      tempBTdata2.id = tempData.bt.length;
      tempBTdata2.image = this.state.btImageData;
      tempBTdata2.bezeichnung += ' II';
      tempData.bt.push(tempBTdata2);
    }
    tempData.date = new Date(tempData.date);

    this.setState({
      BtPOopen: false,
      canSaveBT: false,
      docData: tempData,
      btImageData: '',
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

  handleJSONImport() {
    if (this.jsonFileRef.current.files.length === 1) {
      const fr = new FileReader();
      fr.onloadend = () => {
        const docData = JSON.parse(fr.result);
        if (docData.version === '1.0' && docData.title && docData.date && docData.bt) {
          docData.date = new Date(docData.date);
          this.setState({
            docData,
          }, () => this.saveDoc());
        }
      };
      fr.readAsText(this.jsonFileRef.current.files[0]);
    }
  }

  handleJSONExport() {
    const filename = this.state.docData.title.replace(/[^\w\säöüÄÖÜß]/g, '').replace(/\s+/g, ' ');
    const url = URL.createObjectURL(new Blob([JSON.stringify(this.state.docData)], { type: 'application/json' }));
    this.setState({
      downloadURL: url,
      downloadName: filename + '.occm',
    }, () => this.downloadRef.current.click());
  }

  handleCSVExport() {
    const entries = [
      [{ bezeichnung: 'AZ' }, ...this.state.docData.bt.filter((bt) => bt.btType === 'az')],
      [{ bezeichnung: 'Balisen' }, ...this.state.docData.bt.filter((bt) => bt.btType === 'balisen')],
      [{ bezeichnung: 'Gruppe' }, ...this.state.docData.bt.filter((bt) => bt.btType === 'balisen').map((bt) => ({ bezeichnung: bt.gruppe ? 'x' : '' }))],
      [{ bezeichnung: 'LZB Schrank' }, ...this.state.docData.bt.filter((bt) => bt.btType === 'lzb')],
      [{ bezeichnung: 'Nachbargleis mit Außerbetrieb' }, ...this.state.docData.bt.filter((bt) => bt.btType === 'lzb').map((bt) => ({ bezeichnung: bt.NGmAB ? 'x' : '' }))],
      [{ bezeichnung: 'Indusi' }, ...this.state.docData.bt.filter((bt) => bt.btType === 'indusi')],
      [{ bezeichnung: 'Mit Kabel', ...this.state.docData.bt.filter((bt) => bt.btType === 'indusi').map((bt) => ({ bezeichnung: bt.mitKabel ? 'x' : '' })) }],
      [{ bezeichnung: 'Bemerkung' }, ...this.state.docData.bt.filter((bt) => bt.btType === 'bemerkung')],
    ];
    var rowCount = 0;
    for (var e of entries) {
      rowCount = Math.max(rowCount, e.length);
    }

    var csv = '';
    for (var row = 0; row < rowCount; row++) {
      for (var col = 0; col < entries.length; col++) {
        csv += (entries[col][row] || { bezeichnung: '' }).bezeichnung.replace(';', '') + ';';
      }
      csv += '\n';
    }

    const filename = this.state.docData.title.replace(/[^\w\säöüÄÖÜß]/g, '').replace(/\s+/g, ' ');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/plain' }));
    this.setState({
      downloadURL: url,
      downloadName: filename + '.csv',
    }, () => this.downloadRef.current.click());
  }

  handleBTImage() {
    if (this.cameraFileRef.current.files.length === 1) {
      const fr = new FileReader();
      fr.onloadend = () => {
        this.setState({
          btImageData: fr.result || '',
        });
      };
      fr.readAsDataURL(this.cameraFileRef.current.files[0]);
    }
  }


  render() {
    return (
      <BasicUIComponent
        currentDoc={this.currentDoc || 0}
        currentDocTitle={this.state.docData.title || ''}>

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
            <img style={{ width: '40%', display: 'block', margin: 'auto' }} alt='' src={this.state.btImageData} />
            <mui.Button fullWidth variant='contained' startIcon={<PhotoCameraIcon />}
              onClick={() => this.cameraFileRef.current.click()}>
              Bild hinzufügen
            </mui.Button>
            <br />
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

        <mui.Popover open={this.state.previewOpen} onClose={() => this.setState({ previewOpen: false })} BackdropProps
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}>
          <mui.Box padding='30px' width='80vw' height='80vh'>
            <PDFViewComponent data={this.state.docData} />
          </mui.Box>
        </mui.Popover>

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

        <mui.ButtonGroup fullWidth variant='outlined' color='secondary'>
          <mui.Button onClick={() => this.jsonFileRef.current.click()}>
            OCCM-Import
          </mui.Button>
          <mui.Button onClick={() => this.handleJSONExport()}>
            OCCM-Export
          </mui.Button>
        </mui.ButtonGroup>

        <br />
        <br />

        <mui.Button fullWidth variant='outlined' color='secondary' onClick={() => this.handleCSVExport()}>
          CSV-Export (Excel)
        </mui.Button>

        <br />
        <br />

        <mui.Button fullWidth variant='outlined' onClick={() => this.setState({ previewOpen: true })}>
          PDF-Vorschau
        </mui.Button>

        <br />
        <br />

        <PDFDownloadComponent data={this.state.docData} />

        <br />
        <br />

        <a ref={this.downloadRef} download={this.state.downloadName} href={this.state.downloadURL}>
        </a>
        <input style={{ display: 'none' }} ref={this.jsonFileRef} type='file' accept='.occm;.json' onChange={() => this.handleJSONImport()} />
        <input style={{ display: 'none' }} ref={this.cameraFileRef} type='file' accept='image/*;capture=camera' onChange={() => this.handleBTImage()} />

      </BasicUIComponent>
    );
  }
}

export default routerNavigate(routerLocation(HomePage));