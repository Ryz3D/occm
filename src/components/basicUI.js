import * as mui from '@mui/material';
import React from 'react';
import { Menu as MenuIcon, Assignment as AssignmentIcon, AddBox as AddBoxIcon, ArrowBackIosNew as ArrowBackIosNewIcon } from '@mui/icons-material';

import image from '../img/bg_dark.png';

class BasicUIComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
        };
    }

    handlerMenuOpen() {
        this.setState({
            menuOpen: true,
        });
    }

    handlerMenuClose() {
        this.setState({
            menuOpen: false,
        });
    }

    render() {
        const basicStyle = {
            background: '#121212',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
            backgroundImage: 'url(' + image + ')',
        };

        const exitButtonStyle = {
            position: 'fixed',
            bottom: '2%',
        };

        return (
            <div style={basicStyle}>
                <mui.SwipeableDrawer open={this.state.menuOpen} onOpen={() => this.handlerMenuOpen()}
                    onClose={() => this.handlerMenuClose()}>
                    <mui.List>
                        <mui.ListItemButton>
                            <mui.ListItemIcon>
                                <AssignmentIcon />
                            </mui.ListItemIcon>
                            <mui.ListItemText>
                                Uelzen
                            </mui.ListItemText>
                        </mui.ListItemButton>
                        <mui.ListItemButton>
                            <mui.ListItemIcon>
                                <AddBoxIcon />
                            </mui.ListItemIcon>
                            <mui.ListItemText>
                                Neues Bauprojekt
                            </mui.ListItemText>
                        </mui.ListItemButton>
                        <mui.ListItemButton onClick={() => this.handlerMenuClose()} style={exitButtonStyle}>
                            <mui.ListItemIcon>
                                <ArrowBackIosNewIcon fontSize='small' />
                            </mui.ListItemIcon>
                            <mui.ListItemText>
                                Schließen
                            </mui.ListItemText>
                        </mui.ListItemButton>
                    </mui.List>
                </mui.SwipeableDrawer>
                <mui.AppBar>
                    <mui.Toolbar>
                        <mui.IconButton onClick={() => this.handlerMenuOpen()}>
                            <MenuIcon />
                        </mui.IconButton>
                        <mui.Typography variant='h5' marginLeft='12px'>
                            OCCM
                        </mui.Typography>
                    </mui.Toolbar>
                </mui.AppBar>
                {this.props.children}
            </div>
        );
    }
}

export default BasicUIComponent;