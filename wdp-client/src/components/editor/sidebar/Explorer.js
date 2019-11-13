import React, { Component } from 'react';
import NewTree from '../new_tree/Tree';

class Explorer extends Component {
    render() {
        return (
            <div className="SidebarElement">
                <div className="sidebar_title">EXPLORER</div>
                <div style={{height: '100%', overflow: 'auto'}}>
                    <NewTree></NewTree>
                </div>
            </div>
        );
    }
}

export default Explorer;