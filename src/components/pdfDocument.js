import React from 'react';
import * as mui from '@mui/material';
import { Document, Page, Text, View } from '@react-pdf/renderer';

class PDFTableComponent extends React.Component {
    render() {
        const tableStyle = {
            border: '0.5mm black solid',
            display: 'flex',
            flexDirection: 'column',
        };

        return (
            <div style={tableStyle}>
                {this.props.children}
            </div>
        );
    }
}

class PDFTableRowComponent extends React.Component {
    render() {
        const rowStyle = {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
        };

        return (
            <div style={rowStyle}>
                {this.props.children}
            </div>
        );
    }
}

class PDFTableCellComponent extends React.Component {
    render() {
        const cellStyle = {
            border: '0.5mm black solid',
            width: '100%',
        };

        return (
            <div style={cellStyle}>
                {this.props.children}
            </div>
        );
    }
}

class PDFDocumentComponent extends React.Component {
    render() {
        const boxStyle = {
            display: 'flex',
            alignItems: 'center',
            margin: '0 10px',
            fontSize: 12,
        };

        return (
            <Document
                title={this.props.data.title}
                author='DB OCCM'
                creator='DB OCCM'
                producer='DB OCCM'
                language='de'>
                <Page size='A4'>
                    <View style={{ padding: '15mm 20mm' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>
                            Arbeitsaufnahme für Baustellen GE &amp; SE Maßnahmen Oberbau
                        </Text>
                        <div style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '3mm' }}>
                            <div style={boxStyle}>
                                <Text>Tag: {this.props.data.date.toLocaleDateString('de')}</Text>
                            </div>
                            <div style={boxStyle}>
                                <Text>Bauform: {this.props.data.title}</Text>
                            </div>
                        </div>
                        <div style={{ fontSize: 12, marginTop: '10mm' }}>
                            <PDFTableComponent>
                                {this.props.data.bt.map((bt) =>
                                    <PDFTableRowComponent>
                                        <PDFTableCellComponent>
                                            <Text>{bt.btType}</Text>
                                        </PDFTableCellComponent>
                                        <PDFTableCellComponent>
                                            <Text>{bt.bezeichnung}</Text>
                                        </PDFTableCellComponent>
                                    </PDFTableRowComponent>
                                )}
                            </PDFTableComponent>
                        </div>
                    </View>
                </Page>
            </Document>
        );
    }
}

export default PDFDocumentComponent;