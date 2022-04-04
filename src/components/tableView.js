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
            background: '#fff',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        };

        return (
            <div style={basicStyle}>
                <DataGrid autoHeight
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