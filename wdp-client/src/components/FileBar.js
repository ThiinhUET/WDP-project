import React, { Component } from 'react';
import Menu, { SubMenu, MenuItem, MenuItemGroup } from 'rc-menu';
import { withRouter } from 'react-router-dom';
import '../css/filebar.css'

class FileBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="FileBar">
                <div className="file-item">File</div>
                <div className="file-item">Edit</div>
                <div className="file-item">Selection</div>
                <div className="file-item">View</div>
                <div className="file-item">Go</div>
                <div className="file-item">Debug</div>
                <div className="file-item">Terminal</div>
                <div className="file-item">Help</div>
            </div>
        );
    }
}

export default withRouter(FileBar);