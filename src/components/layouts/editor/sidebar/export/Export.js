import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './style.css';
import Loading from '../../../loading/Loading';
import baseAPI from '../../../../../utils/baseAPI';

class Export extends Component {
    constructor(props){
        super(props);
        this.state = {
            branches : [],
            isLoading: false
        };
    }
    async componentDidMount(){
        let userName = localStorage.username;
        let project = localStorage.projectName;
        if (project) this.setState({isLoading: true});
        axios.get(baseAPI.gitURL + "/repos/" + userName + '/' + project + '/branches').then(res => {
            this.setState({branches : res.data});
            setTimeout(() => this.setState({isLoading: false}), 300);
        }).catch();
    }

    render() {
        return (
            <div className="SidebarElement">
                <div className="sidebar_title">EXPORT</div>
                <div className="sidebar_element" style={{ flexDirection: "column", minHeight: '100%', justifyContent: 'flex-start', alignItems: 'unset' }}>
                    {this.state.isLoading && <Loading size='20' />}
                    <div className="horizontal_divider"></div>
                    {this.state.branches.map((value, index) => (
                        <a key={index} href = {"https://github.com/" + localStorage.username + "/" + localStorage.projectName + "/archive/" + value.name + ".zip"} style={{textDecoration: 'none', color: '#d0d0d0'}}>
                            <div className="branch_element">
                                <i className="fas fa-code-branch" style={{marginRight: '10px'}}></i>
                                {value.name}
                            </div>
                            <div className="horizontal_divider"></div>
                        </a>  
                    ))}
                </div>
            </div>
        );
    }
}

export default withRouter(Export);