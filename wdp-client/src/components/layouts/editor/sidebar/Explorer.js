import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import FileTree from './explorer/FileTree';
import Filter from './explorer/Filter';
import CreateFile from './explorer/CreateFile';

class Explorer extends Component {
    render() {
        return (
            <div className="SidebarElement">
                <div className="sidebar_title">EXPLORER</div>
                <div style={{height: '100%', overflow: 'auto'}}>
                    <Filter />
                    <CreateFile />
                    <FileTree />
                </div>
            </div>
        );
    }
}

export default withRouter(Explorer);