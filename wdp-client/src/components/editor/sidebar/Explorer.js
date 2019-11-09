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
    // componentWillMount(){
    //     axios.post('http://localhost:8080/git/listfile',{login : this.state.login, repo : this.state.repo}).then((res) =>{
    //         this.setState.data = res.data.filetree;
    //     });
    // }
    // shouldComponentUpdate(nextProps, nextState){
    //     return this.state.data != nextState.data;
    // }
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