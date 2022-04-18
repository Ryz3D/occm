import * as mui from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { Delete as DeleteIcon, Download as DownloadIcon } from '@mui/icons-material';

class TableViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailView: null,
            downloadURL: '',
            downloadName: '',
        };
        this.downloadRef = React.createRef();
    }

    handleCellClick(c) {
        if (c.field !== 'delete') {
            this.setState({ detailView: c.row });
        }
    }

    handleImageDownload() {
        const filename = this.state.detailView.bezeichnung.replace(/[^\w\säöüÄÖÜß]/g, '').replace(/\s+/g, ' ');
        this.setState({
            downloadURL: this.state.detailView.image,
            downloadName: filename,
        }, () => this.downloadRef.current.click());
    }

    render() {
        const btTypes = {
            az: 'Achszähler',
            balisen: 'Balisen',
            lzb: 'LZB-Schrank',
            indusi: 'Indusi',
            bemerkung: 'Bemerkung',
        };
        const btCheckboxes = {
            balisen: 'gruppe',
            lzb: 'NGmAB',
            indusi: 'mitKabel',
        };
        const btCheckboxTexts = {
            balisen: 'Gruppe:',
            lzb: 'Nachbargleis mit Außerbetrieb:',
            indusi: 'Mit Kabel:',
        };

        const columns = [];
        if (this.props.filter === '*') {
            columns.push({
                field: 'btType',
                headerName: 'Typ',
                valueGetter: (parameter) => btTypes[parameter.row.btType],
                flex: 1,
            });
        }
        columns.push({
            field: 'bezeichnung',
            headerName: 'Bezeichnung',
            flex: 1,
        });

        const makeCheckbox = (parameter) => (
            <mui.Checkbox disabled checked={parameter.value} />
        );
        if (this.props.filter === 'balisen' || this.props.filter === '*') {
            columns.push({
                field: 'gruppe',
                headerName: 'Balisengruppe',
                renderCell: makeCheckbox,
                width: 50,
            });
        }
        if (this.props.filter === 'indusi' || this.props.filter === '*') {
            columns.push({
                field: 'mitKabel',
                headerName: 'Mit Kabel',
                renderCell: makeCheckbox,
                width: 50,
            });
        }
        if (this.props.filter === 'lzb' || this.props.filter === '*') {
            columns.push({
                field: 'NGmAB',
                headerName: 'NG mit AB',
                renderCell: makeCheckbox,
                width: 50,
            });
        }

        columns.push({
            field: 'delete',
            headerName: 'Löschen',
            valueGetter: () => '',
            renderCell: (parameter) => (
                <mui.IconButton onClick={() => this.props.onDelete(parameter.row.id)}>
                    <DeleteIcon color='error' />
                </mui.IconButton>
            ),
            width: 50,
        });

        const basicStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        };

        return (
            <div style={basicStyle}>
                <DataGrid autoHeight
                    onCellClick={(c) => this.handleCellClick(c)}
                    columns={columns} rows={this.props.docData.bt.filter((bt) => this.props.filter === bt.btType || this.props.filter === '*')}
                    components={{
                        NoRowsOverlay: () => <mui.Typography variant='h2' fontSize='1rem' style={{ textAlign: 'center' }}>
                            Keine Daten vorhanden
                        </mui.Typography>,
                    }} />
                <mui.Popover open={this.state.detailView !== null} onClose={() => this.setState({ detailView: null })} BackdropProps
                    transformOrigin={{
                        horizontal: 'center',
                        vertical: 'center',
                    }}
                    anchorOrigin={{
                        horizontal: 'center',
                        vertical: 'center',
                    }}>
                    <mui.Box padding='20px' width='80vw'>
                        <mui.Typography variant='body2' color='GrayText'>
                            Typ:
                        </mui.Typography>
                        <mui.Typography variant='h5'>
                            {btTypes[(this.state.detailView || {}).btType]}
                        </mui.Typography>
                        <br />
                        <mui.Typography variant='body2' color='GrayText'>
                            Bezeichnung:
                        </mui.Typography>
                        <mui.Typography variant='h5'>
                            {(this.state.detailView || {}).bezeichnung}
                        </mui.Typography>
                        {btCheckboxes[(this.state.detailView || {}).btType] &&
                            <>
                                <br />
                                <mui.Typography variant='body2' color='GrayText'>
                                    {btCheckboxTexts[(this.state.detailView || {}).btType]}
                                </mui.Typography>
                                <mui.Typography variant='h5'>
                                    {(this.state.detailView || {})[btCheckboxes[(this.state.detailView || {}).btType]] ? 'Ja' : 'Nein'}
                                </mui.Typography>
                            </>
                        }
                        <>
                            <br />
                            <mui.Typography variant='body2' color='GrayText'>
                                Bild:
                            </mui.Typography>
                            <mui.Typography variant='h5'>
                                {(this.state.detailView || {}).image ?
                                    <>
                                        <img style={{ width: '40%', display: 'block', margin: 'auto' }} alt='' src={(this.state.detailView || {}).image} />
                                        <mui.Button fullWidth variant='outlined' color='secondary' startIcon={<DownloadIcon />} onClick={() => this.handleImageDownload()}>
                                            Bild Herunterladen
                                        </mui.Button>
                                    </>
                                    :
                                    <>Kein Bild vorhanden</>
                                }
                            </mui.Typography>
                        </>
                        <br />
                        <br />
                        <mui.Button fullWidth variant='outlined' onClick={() => this.setState({ detailView: null })}>
                            Schließen
                        </mui.Button>
                    </mui.Box>
                </mui.Popover>
                <a ref={this.downloadRef} download={this.state.downloadName} href={this.state.downloadURL}>
                </a>
            </div>
        );
    }
}

export default TableViewComponent;