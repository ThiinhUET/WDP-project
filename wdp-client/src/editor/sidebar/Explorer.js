import React, { Component } from 'react';
import FileExplore from '../FileExplore';
import ExplorerView from './ExplorerView';
class Explorer extends Component {
    render() {
        return (
            <div className="explorer">
                <div style={{margin: '13.5px auto'}}>EXPLORER</div>
                <ExplorerView />
            </div>
        );
    }
}

export default Explorer;