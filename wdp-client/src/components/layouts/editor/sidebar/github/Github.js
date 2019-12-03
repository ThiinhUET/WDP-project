import React, { Component, Fragment as div } from 'react';
import { withRouter } from 'react-router-dom';
import Authenticate from '../../../../common/authprovider/Authenticate';
import { defaultdata } from '../data';
import axios from 'axios';

import { Treebeard, decorators } from 'react-treebeard';
import defaultStyles from '../defaultStyles';
import Header from '../Header';
import Toggle from '../Toggle';

import './style.css';
import Loading from '../../../loading/Loading';

class Github extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        let newData = (location.state && location.state.data) ? location.state.data : defaultdata;
        this.state = {
            codeToCommit: "",
            errMess: "",
            data: newData,
            cursor: (location.state && location.state.cursor) ? location.state.cursor : {
                oldcontent: '',
                content: ''
            },
            isLoading: false,
            isCreating: false,
            modifiedTree : {
                "name": newData.name,
                "type": newData.type,
                "path": newData.path,
                "toggled": true,
                "children": []
            }
        };
        this.onToggle = this.onToggle.bind(this);
    
    }

    componentDidMount() {
        let modified = {...this.state.data};
        this.props.history.listen((location) => this.setState({
            data: (location.state && location.state.data) ? location.state.data : this.state.data,
            cursor: (location.state && location.state.cursor) ? location.state.cursor : this.state.cursor,
        }));

        this.setState({modifiedTree : this.getModifiedData(modified)});
    }

    getModifiedData(node) {
        let newNode = {
            "name": node.name,
            "type": node.type,
            "path": node.path,
            "toggled": true,
            "modified": false,
            "children": []
        };
        if (node.children) for (let i = 0; i < node.children.length; i ++)
            if (node.children[i].type !== 'folder' && (node.children[i].modified || node.children[i].modified === undefined)) {
                newNode.modified = true;
                newNode.children.push(node.children[i]);
            }
            else {
                let newChildrenNode = this.getModifiedData(node.children[i]);
                if (newChildrenNode.modified) newNode.children.push(newChildrenNode);
            }
        
        return newNode;
    }

    signIn() {
        const authenticate = new Authenticate();
        authenticate.signin(() => this.props.history.push('/editor'));
    }

    updateData(node) {
        if (node.type !== 'folder') {node.oldcontent = node.content; node.modified = false;}
        else {
            node.modified = false;
            if (node.children) for (let i = 0; i < node.children.length; i ++) node.children[i] = this.updateData(node.children[i]);
        }
        return node;
    }

    async commitFile(message, modifiedCursor, userName, email, project, accessToken) {
        try{
            if (modifiedCursor.modified === true) {
                await axios.get('https://api.github.com/repos/' + userName + '/' + project + '/contents' + modifiedCursor.path, { headers: { 'Authorization': 'token ' + accessToken } }).then(async res => {
                    let shaKey = res.data.sha;
                    let decodedValue = Buffer.from(modifiedCursor.content).toString('base64');
                    await axios.put('https://api.github.com/repos/' + userName + '/' + project + '/contents' + modifiedCursor.path, {
                        "message": message,
                        "committer": {
                            "name": userName,
                            "email": email
                        },
                        "content": decodedValue,
                        "sha": shaKey
                    }, { headers: { 'Authorization': 'token ' + accessToken } }
                    ).catch((err) => console.log(err));
                }).catch((err) => console.log(err));
            }
            else {
                let decodedValue = Buffer.from(modifiedCursor.content).toString('base64');
                await axios.put('https://api.github.com/repos/' + userName + '/' + project + '/contents' + modifiedCursor.path, {
                    "message": message,
                    "committer": {
                        "name": userName,
                        "email": email
                    },
                    "content": decodedValue
                }, { headers: {'Authorization': 'token ' + accessToken } }
                ).catch((err) => console.log(err));
            }
        }catch(err){
            console.log(err);
        }
    }

    async commitCode(node, message) {
        for (let i = 0; i < node.children.length; i ++) 
        if (node.children[i].type !== 'folder') {
            let modifiedCursor = node.children[i];
            let userName = localStorage.getItem('username');
            let email = localStorage.getItem('email');
            let project = localStorage.getItem('projectName');
            let accessToken = localStorage.getItem('accessToken');
            await this.commitFile(message, modifiedCursor, userName, email, project, accessToken);
        }
        else await this.commitCode(node.children[i], message);
    }

    async commit(node, message) {
        this.setState({isLoading: true});
        await this.commitCode(node, message);
        this.state.cursor.oldcontent = this.state.cursor.content;
        await this.props.history.push({
            state: {...this.props.location.state, data: this.updateData(this.state.data), cursor: this.state.cursor}
        });
        this.setState({modifiedTree : {
            "name": this.state.data.name,
            "type": this.state.data.type,
            "path": this.state.data.path,
            "toggled": true,
            "children": []
        }, isLoading: false})
        try {
            document.getElementById("commitMsg").value = null;
        } catch(err) {
            console.log(err);
        }
    }

    async create() {
        let accessToken = localStorage.accessToken;
        let name = document.getElementById("createName").value.replace(' ', '-');
        localStorage.setItem("projectName", name);
        let description = document.getElementById("createDescription").value;
        let homepage = document.getElementById("createHomepage").value;
        
        if (name) {
            this.setState({isCreating: true});
            axios.post('https://api.github.com/user/repos', {
                "name": name,
                "description": description,
                "homepage": homepage,
                "auto_init": true
            },{ headers: { 'Authorization': 'token ' + accessToken } }).then(() => {
                localStorage.setItem("repositories", name + ',' + localStorage.repositories);
                this.commit(this.state.modifiedTree, "Initial commit");
            }).then(() => {
                this.setState({isCreating: false});
                this.state.data.name = name;
                this.props.history.push({
                    pathname: '/editor/' + name,
                    state: {...this.props.location.state, data: this.state.data, cursor: this.state.cursor}
                })
            }).catch(() => this.setState({isCreating: false, errMess: "Name is exist !"}));
        }
        else {
            this.setState({errMess: "Name is required !"});
        }
    }

    onToggle(node, toggled) {
        const { cursor, modifiedTree } = this.state;

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
        this.setState(() => ({ cursor: node, modifiedTree: Object.assign({}, modifiedTree) }));
    }
    render() {
        return (
            <div className="SidebarElement">
                <div className="sidebar_title">GITHUB</div>
                <div className="sidebar_element" style={{ flexDirection: "column" }}>
                    {!localStorage.uid && <div className="signin_git_button" onClick={() => this.signIn()} style={{margin: '10px'}}>
                        <i className="fab fa-github" style={{ width: '18px', height: '18px', paddingRight: '5px' }}></i>
                        <span>Sign in with GitHub</span>
                    </div>}
                    {localStorage.uid && <div style={{fontFamily: 'Source Sans Pro,Open Sans,Segoe UI,sans-serif'}}>
                        {this.props.location.pathname[8] && <div className="commit_box">
                            <input className="commit_input" id="commitMsg" spellCheck="false" autoComplete="off" placeholder="Commit messages"></input>
                            <button className="commit_btn" onClick={() => this.commit(this.state.modifiedTree, document.getElementById("commitMsg").value)}>Commit</button>
                        </div>}
                        {!this.props.location.pathname[8] && <div>
                            {this.state.isCreating && <Loading size='20' />}
                            <div style={{fontSize: '11pt', margin: '5px', fontStyle: 'italic'}}>Create new project:</div>
                            {this.state.errMess !== "" && <div style={{fontSize: '10pt', margin: '5px', color: '#dd4b39'}}>{this.state.errMess}</div>}
                            <div className="commit_box">
                                <input className="commit_input" id="createName" spellCheck="false" autoComplete="off" placeholder="Name" onKeyDown={() => this.setState({errMess: ""})}></input>
                            </div>
                            <div className="commit_box">
                                <input className="commit_input" id="createDescription" spellCheck="false" autoComplete="off" placeholder="Description" onKeyDown={() => this.setState({errMess: ""})}></input>
                            </div>
                            <div className="commit_box">
                                <input className="commit_input" id="createHomepage" spellCheck="false" autoComplete="off" placeholder="Homepage" onKeyDown={() => this.setState({errMess: ""})}></input>
                                <button className="commit_btn" onClick={() => this.create()}>Create</button>
                            </div>
                        </div>}
                        <div style={{...defaultStyles.component, top: '0'}}>
                            {this.state.isLoading && <Loading size='20' />}
                            <Treebeard
                                style={defaultStyles}
                                data={this.state.modifiedTree}
                                onToggle={this.onToggle}
                                decorators={{ ...decorators, Toggle, Header }}
                            />
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}

export default withRouter(Github);