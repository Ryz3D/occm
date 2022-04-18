import * as mui from '@mui/material';
import React from 'react';
import {
    Menu as MenuIcon,
    Assignment as AssignmentIcon,
    AddBox as AddBoxIcon,
    ArrowBackIosNew as ArrowBackIosNewIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import routerNavigate from '../wrapper/routerNavigate';

import image from '../img/bg_dark.png';

class BasicUIComponent extends React.Component {

    constructor(props) {
        super(props);

        const docs = [];
        if (localStorage.getItem('doc0')) {
            for (var i = 0; docs[docs.length - 1] !== null; i++) {
                const docDataStr = localStorage.getItem('doc' + i);
                docs.push(JSON.parse(docDataStr === null ? 'null' : docDataStr));
            }
        }
        docs[this.props.currentDoc] = this.props.currentDocTitle;
        this.state = {
            menuOpen: false,
            docs: docs.slice(0, docs.length - 1),
            deleteConfirms: 0,
            deleteDoc: 0,
        };
    }

    componentDidUpdate() {
        if ((this.state.docs[this.props.currentDoc] || {}).title !== this.props.currentDocTitle) {
            const tempDocs = JSON.parse(JSON.stringify(this.state.docs));
            while (tempDocs.length <= this.props.currentDoc) {
                tempDocs.push({ title: '' });
            }
            if (Object.keys(tempDocs[this.props.currentDoc]).length > 0) {
                tempDocs[this.props.currentDoc].title = this.props.currentDocTitle;
                this.setState({
                    docs: tempDocs,
                });
            }
        }
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

    handleDocOpen(i) {
        this.setState({
            menuOpen: false,
        });
        this.props.navigate('/?id=' + i);
    }

    handleDeletePrompt(i) {
        this.setState({
            deleteDoc: i,
            deleteConfirms: 3,
        });
    }

    handleDeleteAbort() {
        this.setState({
            deleteConfirms: 0,
        });
    }

    handleDeleteConfirm() {
        this.setState({
            deleteConfirms: this.state.deleteConfirms - 1,
        }, () => {
            if (this.state.deleteConfirms === 0) {
                this.handleDocDelete();
            }
        });
    }

    handleDocDelete() {
        const tempDocs = JSON.parse(JSON.stringify(this.state.docs));
        tempDocs[this.state.deleteDoc] = {};
        localStorage.setItem('doc' + this.state.deleteDoc, '{}');
        this.setState({
            docs: tempDocs,
        }, () => {
            if (localStorage.getItem('currentDoc') === this.state.deleteDoc.toString()) {
                this.handleAddDoc();
            }
        });
    }

    handleAddDoc() {
        this.setState({
            menuOpen: false,
        });
        this.props.navigate('/?id=' + this.state.docs.length);
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

        const sidebarButtonStyle = {
            textTransform: 'none',
            textAlign: 'left',
            color: '#ddd',
            hyphens: 'auto',
            wordBreak: 'break-word',
            whiteSpace: 'pre-line',
            width: '100%',
            maxWidth: '30vw',
        }

        const exitButtonStyle = {
            position: 'absolute',
            bottom: '2%',
            width: '100%',
        };

        return (
            <div style={basicStyle}>
                <mui.SwipeableDrawer open={this.state.menuOpen} onOpen={() => this.handlerMenuOpen()}
                    onClose={() => this.handlerMenuClose()}>
                    <mui.List>
                        {this.state.docs.map((doc, i) =>
                            Object.keys(doc).length > 0 ?
                                <mui.ListItem>
                                    <mui.Button style={sidebarButtonStyle} variant={this.props.currentDoc === i ? 'contained' : ''} onClick={() => this.handleDocOpen(i)}>
                                        <mui.ListItemIcon>
                                            <AssignmentIcon />
                                        </mui.ListItemIcon>
                                        <mui.ListItemText>
                                            {doc.title}
                                        </mui.ListItemText>
                                    </mui.Button>
                                    <mui.ListItemSecondaryAction onClick={() => this.handleDeletePrompt(i)}>
                                        <mui.IconButton>
                                            <DeleteIcon />
                                        </mui.IconButton>
                                    </mui.ListItemSecondaryAction>
                                </mui.ListItem>
                                :
                                <></>
                        )}
                        <mui.ListItemButton onClick={() => this.handleAddDoc()}>
                            <mui.ListItemIcon>
                                <AddBoxIcon />
                            </mui.ListItemIcon>
                            <mui.ListItemText>
                                Neues Bauprojekt
                            </mui.ListItemText>
                        </mui.ListItemButton>
                    </mui.List>
                    <div style={exitButtonStyle}>
                        <mui.Divider />
                        <mui.ListItemButton onClick={() => this.handlerMenuClose()}>
                            <mui.ListItemIcon>
                                <ArrowBackIosNewIcon fontSize='small' />
                            </mui.ListItemIcon>
                            <mui.ListItemText>
                                Schließen
                            </mui.ListItemText>
                        </mui.ListItemButton>
                    </div>
                </mui.SwipeableDrawer>
                <mui.AppBar>
                    <mui.Toolbar>
                        <mui.IconButton onClick={() => this.handlerMenuOpen()}>
                            <MenuIcon />
                        </mui.IconButton>
                        <mui.Typography variant='h5' marginLeft='12px' marginTop='2px'>
                            OCCM
                        </mui.Typography>
                    </mui.Toolbar>
                </mui.AppBar>

                <mui.Box padding='20px 50px'>
                    {this.props.children}
                </mui.Box>

                <mui.Popover onClose={() => this.handleDeleteAbort()} open={this.state.deleteConfirms !== 0} BackdropProps
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                    transformOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <mui.Box padding='20px'>
                        <mui.Typography variant={'h3'}>
                            Löschen bestätigen
                        </mui.Typography>
                        Wollen Sie {(this.state.docs[this.state.deleteDoc] || {}).title} löschen?
                        <br />
                        <br />
                        <mui.ButtonGroup>
                            <mui.Button variant='outlined' onClick={() => this.handleDeleteAbort()}>
                                Abbrechen
                            </mui.Button>
                            <mui.Button variant='contained' disabled={this.state.deleteConfirms <= 0}
                                onClick={() => this.handleDeleteConfirm()}>
                                Löschen ({this.state.deleteConfirms} mal bestätigen)
                            </mui.Button>
                        </mui.ButtonGroup>
                    </mui.Box>
                </mui.Popover>
            </div>
        );
    }
}

export default routerNavigate(BasicUIComponent);