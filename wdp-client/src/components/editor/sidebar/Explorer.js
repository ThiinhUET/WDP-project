import React, { Component } from 'react';
import FileExplore from '../old_tree/FileExplore';
import ExplorerView from './ExplorerView';
import NewTree from '../new_tree/Tree';
import axios from 'axios';
class Explorer extends Component {
    constructor(props){
        super(props);
        this.state = {
            login : "ThiinhUET",
            repo : "WDP-project",
            data : "Hello"
        }
    }

    render() {
        return (
            <div className="explorer">
                <div style={{textAlign: 'center', margin: '10px auto', color: '#f0f0f0', fontFamily: 'Source Sans Pro,Open Sans,Segoe UI,sans-serif', fontWeight: '600'}}>EXPLORER</div>
                {/* <FileExplore test = {this.state.data}/> */}
                <NewTree></NewTree>
            </div>
        );
    }
}

export default Explorer;