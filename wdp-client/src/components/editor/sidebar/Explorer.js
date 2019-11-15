import React, { Component } from 'react';
import NewTree from '../new_tree/Tree';
import axios from 'axios';

class Explorer extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
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