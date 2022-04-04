import React from 'react';
import * as mui from '@mui/material';
import { BlobProvider } from '@react-pdf/renderer';
import PDFDocumentComponent from './pdfDocument';

class PDFDownloadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            downloadLink: '',
        };
    }

    handlePDFData(parameters) {
        if (this.state.downloadLink !== parameters.url) {
            this.setState({
                downloadLink: parameters.url,
            });
        }
        return <></>;
    }

    render() {
        return (
            <>
                <BlobProvider document={<PDFDocumentComponent data={this.props.data} />}>
                    {(parameters) => this.handlePDFData(parameters)}
                </BlobProvider>
                <mui.Button fullWidth variant='contained' href={this.state.downloadLink}>
                    PDF erstellen
                </mui.Button>
            </>
        );
    }
}

export default PDFDownloadComponent;