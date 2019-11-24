import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import FileTree from './FileTree';
import Filter from './Filter';
import CreateFile from './CreateFile';

import { defaultdata } from './data';
import { dataFlow } from '../../../../../services';

class Explorer extends Component {
    constructor(props){
        super(props);
    }
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