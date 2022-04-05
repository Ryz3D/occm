import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';

class PDFTableComponent extends React.Component {
    render() {
        const tableStyle = {
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
            padding: 0,
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
            margin: 0,
            padding: 0,
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
            fontSize: this.props.header ? 13 : 11,
            margin: '-0.25mm',
            padding: this.props.header ? '1.5mm 1mm' : '0 1mm',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        };
        const textStyle = {
            display: 'inline-block',
            height: '100%',
            marginTop: this.props.header ? '0.8mm' : '1.0mm',
            wordBreak: 'anywhere',
        };
        const checkboxStyle = {
            display: 'inline-block',
            width: '8mm',
            height: '6mm',
            margin: '0.4mm 0',
            border: '0.5mm black solid',
            padding: 0,
        };
        const checkboxTextStyle = {
            textAlign: 'center',
            fontSize: 12,
            marginTop: '0.2mm',
        };

        return (
            <div style={cellStyle}>
                <Text style={textStyle}>{this.props.text}</Text>
                {this.props.checkbox &&
                    <div style={checkboxStyle}>
                        <Text style={checkboxTextStyle}>
                            {this.props.checked ? 'X' : ''}
                        </Text>
                    </div>
                }
            </div>
        );
    }
}

class PDFDocumentComponent extends React.Component {
    render() {
        const entries = [
            [{ bezeichnung: 'AZ' }, ...this.props.data.bt.filter((bt) => bt.btType === 'az')],
            [{ bezeichnung: 'Balisen' }, ...this.props.data.bt.filter((bt) => bt.btType === 'balisen')],
            [{ bezeichnung: 'LZB Schrank' }, ...this.props.data.bt.filter((bt) => bt.btType === 'lzb')],
            [{ bezeichnung: 'Indusi' }, ...this.props.data.bt.filter((bt) => bt.btType === 'indusi')],
            [{ bezeichnung: 'Bemerkung' }, ...this.props.data.bt.filter((bt) => bt.btType === 'bemerkung')],
        ];
        var rowCount = 0;
        for (var e of entries) {
            rowCount = Math.max(rowCount, e.length);
        }
        const btWithCheckbox = ['balisen', 'lzb', 'indusi'];
        const btCheckboxes = {
            balisen: 'gruppe',
            lzb: 'NGmAB',
            indusi: 'mitKabel',
        };

        const viewStyle = {
            position: 'absolute',
            top: '15mm',
            bottom: '15mm',
            left: '20mm',
            right: '20mm',
        };
        const boxStyle = {
            display: 'flex',
            alignItems: 'center',
            margin: '0 10px',
            fontSize: 12,
        };
        const footStyle = {
            position: 'absolute',
            bottom: '5mm',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        };

        return (
            <Document
                title={this.props.data.title}
                author='DB OCCM'
                creator='DB OCCM'
                producer='DB OCCM'
                language='de'>
                <Page size='A4'>
                    <View fixed style={viewStyle}>
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
                                {new Array(rowCount).fill(0).map((n, i) =>
                                    <PDFTableRowComponent>
                                        {entries.map(e =>
                                            e[i] ?
                                                <PDFTableCellComponent header={i === 0}
                                                    text={e[i].bezeichnung}
                                                    checkbox={btWithCheckbox.includes(e[i].btType)}
                                                    checked={e[i][btCheckboxes[e[i].btType]]} />
                                                :
                                                <PDFTableCellComponent text='' />
                                        )}
                                    </PDFTableRowComponent>
                                )}
                            </PDFTableComponent>
                        </div>
                        <div style={footStyle}>
                            <div>
                                <Text style={{ fontSize: 12, textAlign: 'center' }}>
                                    Seite
                                </Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: 12, textAlign: 'center' }}>
                                    DB Netz AG, I.NA-N-RL
                                </Text>
                            </div>
                        </div>
                    </View>
                </Page>
            </Document>
        );
    }
}

export default PDFDocumentComponent;