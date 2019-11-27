import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Authenticate from '../../../../common/authprovider/Authenticate';
import { contentFlow } from '../../../../../services';
import { defaultdata } from '../data';
import axios from 'axios';

import { Treebeard, decorators } from 'react-treebeard';
import defaultStyles from '../defaultStyles';
import Header from '../Header';
import Toggle from '../Toggle';


class Github extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            codeToCommit: "",
            data: (location.state && location.state.data) ? location.state.data : defaultdata,
            cursor: (location.state && location.state.cursor) ? location.state.cursor : '',
            modifiedTree : []
        };
        this.onToggle = this.onToggle.bind(this);
    
    }

    componentDidMount() {
        let modified = {...this.state.data};
        this.props.history.listen((location) => this.setState({
            data: (location.state && location.state.data) ? location.state.data : this.state.data,
            cursor: (location.state && location.state.cursor) ? location.state.cursor : this.state.cursor,
        }));
        
        modified.children =  modified.children.filter((value, index) => {
             return value.modified === true;
        });

        this.setState({modifiedTree : modified});
    }

    signIn() {
        const authenticate = new Authenticate();
        authenticate.signin(() => this.props.history.push('/editor'));
    }

    commitCode() {
        this.contenFlowSub = contentFlow.subscribe((value) => {
            try{
                let userName = localStorage.getItem('username');
                let email = localStorage.getItem('email');
                let project = localStorage.getItem('projectName');
                let accessToken = localStorage.getItem('accessToken');
                let fileName = this.state.cursor.name;
                let message = document.getElementById('commitMsg').value;
                if (value !== '<!--Happy Coding-->') {
                    axios.get('https://api.github.com/repos/' + userName + '/' + project + '/contents/' + fileName, { headers: { 'Authorization': 'token ' + accessToken } }).
                        then(res => {
                            let shaKey = res.data.sha;
                            let decodedValue = Buffer.from(value).toString('base64');
                            axios.put('https://api.github.com/repos/' + userName + '/' + project + '/contents/' + fileName, {
                                "message": message,
                                "committer": {
                                    "name": userName,
                                    "email": email
                                },
                                "content": decodedValue,
                                "sha": shaKey
                            }, { headers: { 'Authorization': 'token ' + accessToken } }).
                                then(res1 => {
                                   window.alert("Commit code successfully !")
                                }).catch(err => {
                                    this.openNotification(false);
                                });
                        }).catch(err => {
                            console.log("Lỗi ở get content");
                        });
                }
            }catch(err){
                console.log(err);
            }
        });
    }

    onToggle(node, toggled) {
        const { cursor, data } = this.state;

        console.log(cursor);
        
        if (cursor) {
            this.setState(() => ({ cursor, active: false }));
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        if (node.type !== 'folder'){
            this.props.history.push({
                state: { ...this.props.location.state, cursor: node }
            });
        } 
        this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
        // let dataSearch = document.getElementById("searchBox");
        // if (dataSearch.value) {
        //     this.setState({data: this.props.location.state.data});
        //     dataSearch.value = null;
        // }
    }
    render() {
        return (
            <div className="SidebarElement">
                <div className="sidebar_title">GITHUB</div>
                <div className="sidebar_element" style={{ flexDirection: "column" }}>
                    {!localStorage.uid && <div className="signin_git_button" onClick={() => this.signIn()}>
                        <i className="fab fa-github" style={{ width: '18px', height: '18px', paddingRight: '5px' }}></i>
                        <span>Sign in with GitHub</span>
                    </div>}
                    <input id="commitMsg" placeholder="Commit messages" style={{ flex: '1', display: 'block', color : 'black', marginBottom: '1vh', textAlign : 'center' }}></input>
                    <button onClick={() => this.commitCode()} style={{ background: 'green', cursor: 'pointer', marginBottom: '1vh'}}>Commit Changes</button>
                    <Treebeard
                        style={defaultStyles}
                        data={this.state.modifiedTree}
                        onToggle={this.onToggle}
                        decorators={{ ...decorators, Toggle, Header }}
                    />
                    <div></div>
                </div>
            </div>
        );
    }
}

export default withRouter(Github);