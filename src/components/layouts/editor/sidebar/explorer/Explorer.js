import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import FileTree from './FileTree';
import Filter from './Filter';
import CreateFile from './CreateFile';

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