import React from 'react';
import * as mui from '@mui/material';
import { Document, Page, Text, View } from '@react-pdf/renderer';

class PDFDocumentComponent extends React.Component {
    render() {
        const basicStyle = {
            background: '#fff',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 'calc(100% - 30px)',
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
            <Document>
                <Page size='A4'>
                    <View>
                        <Text>Arbeitsaufnahme für Baustellen GE &amp; SE Maßnahmen Oberbau</Text>
                    </View>
                    <View>
                        <Text>Section 2</Text>
                    </View>
                </Page>
            </Document>
        );
        /*
                return (
                    <div style={basicStyle}>
                        <mui.Typography variant='h6'>
                            Arbeitsaufnahme für Baustellen GE &amp; SE Maßnahmen Oberbau
                        </mui.Typography>
                        <mui.Grid container style={{ justifyContent: 'center' }} >
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
                    </div>
                );
        */
    }
}

export default PDFDocumentComponent;