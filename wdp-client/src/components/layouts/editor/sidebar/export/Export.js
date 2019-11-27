import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <div className="SidebarElement">
                <div className="sidebar_title">DOWNLOAD</div>
                
                {this.state.branches.map((value, index) => (
                    <a href = {"https://github.com/" + localStorage.username + "/" + localStorage.projectName + "/archive/" + value.name + ".zip"}>
                        <div>
                            {value.name}
                        </div>
                        
                    </a>  
                ))}
            
            </div>
        );
    }
}

export default withRouter(Export);