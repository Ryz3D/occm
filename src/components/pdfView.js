import * as mui from '@mui/material';
import React from 'react';

class PDFViewComponent extends React.Component {
    render() {
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
                <mui.Typography variant='h6'>
                    Arbeitsaufnahme für Baustellen GE &amp; SE Maßnahmen Oberbau
                </mui.Typography>
                <mui.Grid container style={{ justifyContent: 'center' }} >
                    <mui.Grid item style={boxItemStyle}>
                        <b>Tag:</b>
                        <div style={boxStyle}>
                            {this.props.docData.date.toLocaleDateString()}
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
    }
}

export default PDFViewComponent;