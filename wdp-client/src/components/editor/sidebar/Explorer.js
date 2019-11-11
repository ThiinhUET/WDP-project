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
                <div style={{margin: '13.5px auto'}}>EXPLORER</div>
                {/* <FileExplore test = {this.state.data}/> */}
                <NewTree></NewTree>
            </div>
        );
    }
}

export default Explorer;