import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './style.css';

class Export extends Component {
    constructor(props){
        super(props);
        this.state = {
            branches : []
        }
    }
    async componentDidMount(){
        let userName = localStorage.username;
        let project = localStorage.projectName;
        axios.get("https://api.github.com/repos/" + userName + '/' + project + '/branches').then(res => {
            this.setState({branches : res.data});
        }).catch();
    }

    render() {
        return (
            <div className="SidebarElement">
                <div className="sidebar_title">DOWNLOAD</div>
                
                {this.state.branches.map((value, index) => (
                    <a href = {"https://github.com/" + localStorage.username + "/" + localStorage.projectName + "/archive/" + value.name + ".zip"} style={{textDecoration: 'none', color: '#d0d0d0'}}>
                        <div style={{display: 'block', width: '100%', wordBreak: 'break-all'}}>
                            <i className="fas fa-code-branch"></i>
                            {value.name}
                        </div>
                        
                    </a>  
                ))}
            
            </div>
        );
    }
}

export default withRouter(Export);