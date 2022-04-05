import React from 'react';
import * as mui from '@mui/material';
import { BlobProvider } from '@react-pdf/renderer';
import PDFDocumentComponent from './pdfDocument';

class PDFDownloadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            downloadLink: null,
        };
    }

    handlePDFData(parameters) {
        if (this.state.downloadLink !== parameters.url) {
            this.setState({
                downloadLink: parameters.url || null,
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
                <mui.Button fullWidth variant='contained' disabled={this.state.downloadLink === null}
                    href={this.state.downloadLink} target='_blank'>
                    PDF erstellen
                </mui.Button>
            </>
        );
    }
}

export default PDFDownloadComponent;