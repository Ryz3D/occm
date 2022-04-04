import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFDocumentComponent from './pdfDocument';

class PDFViewComponent extends React.Component {
    render() {
        const basicStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
        };

        // pass docdata from query parameter

        return (
            <>
                <PDFViewer style={basicStyle}>
                    <PDFDocumentComponent />
                </PDFViewer>
            </>
        );
    }
}

export default PDFViewComponent;