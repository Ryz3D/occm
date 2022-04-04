import * as mui from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';

class TableViewComponent extends React.Component {
    render() {
        const btTypes = {
            az: 'Achszähler',
            balisen: 'Balisen',
            lzb: 'LZB-Schrank',
            indusi: 'Indusi',
            bemerkung: 'Bemerkung',
        };

        const columns = [];
        if (this.props.filter === '*') {
            columns.push({
                field: 'btType',
                headerName: 'Typ',
                valueGetter: (parameter) => btTypes[parameter.row.btType],
            });
        }
        columns.push({
            field: 'bezeichnung',
            headerName: 'Bezeichnung',
        });

        const makeCheckbox = (parameter) => (
            <mui.Checkbox disabled checked={parameter.value} />
        );
        if (this.props.filter === 'balisen' || this.props.filter === '*') {
            columns.push({
                field: 'gruppe',
                headerName: 'Balisengruppe',
                renderCell: makeCheckbox,
            });
        }
        if (this.props.filter === 'indusi' || this.props.filter === '*') {
            columns.push({
                field: 'mitKabel',
                headerName: 'Mit Kabel',
                renderCell: makeCheckbox,
            });
        }
        if (this.props.filter === 'lzb' || this.props.filter === '*') {
            columns.push({
                field: 'NGmAB',
                headerName: 'NG mit AB',
                renderCell: makeCheckbox,
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
            )
        });

        for (var c of columns) {
            c.flex = 1;
        }

        const basicStyle = {
            background: '#fff',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        };

        const boxStyle = {
            border: '#000 solid 2px',
            marginLeft: '6px',
            padding: '2px 10px',
        };

        const boxItemStyle = {
            display: 'flex',
            alignItems: 'center',
        };

        return (
            <div style={basicStyle}>
                <mui.Grid container style={{ justifyContent: 'center', padding: '20px' }} >
                    <mui.Grid item style={boxItemStyle}>
                        <b>Tag:</b>
                        <div style={boxStyle}>
                            {this.props.docData.date.toLocaleDateString('de')}
                        </div>
                    </mui.Grid>
                    <div style={{ width: '31px' }} />
                    <mui.Grid item style={boxItemStyle}>
                        <b>Baustelle:</b>
                        <div style={boxStyle}>
                            {this.props.docData.title}
                        </div>
                    </mui.Grid>
                </mui.Grid>
                <DataGrid density='compact'
                    columns={columns} rows={this.props.docData.bt.filter((bt) => this.props.filter === bt.btType || this.props.filter === '*')}
                    components={{
                        NoRowsOverlay: () => <mui.Typography variant='h2' fontSize='1rem' style={{ textAlign: 'center' }}>
                            Keine Daten vorhanden
                        </mui.Typography>,
                    }} />
            </div>
        );
    }
}

export default TableViewComponent;