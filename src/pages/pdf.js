import * as mui from '@mui/material';
import React from 'react';
import PDFViewComponent from '../components/pdfView';

class PDFPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // add link in homepage -> url query to pdfpage
    // pass data from localstorage to pdfview
  }


  render() {
    return (
      <PDFViewComponent />
    );
  }
}

export default PDFPage;