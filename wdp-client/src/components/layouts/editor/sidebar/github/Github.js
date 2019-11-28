import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Authenticate from '../../../../common/authprovider/Authenticate';
import { contentFlow } from '../../../../../services';
import { defaultdata } from '../data';
import axios from 'axios';

import { Treebeard, decorators } from 'react-treebeard';
import defaultStyles from '../defaultStyles';
import Header from '../Header';
import Toggle from '../Toggle';

import './style.css';

class Github extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        let newData = (location.state && location.state.data) ? location.state.data : defaultdata;
        this.state = {
            codeToCommit: "",
            data: newData,
            cursor: (location.state && location.state.cursor) ? location.state.cursor : {
                oldcontent: '',
                content: ''
            },
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
        if (node.children)
            for (let i = 0; i < node.children.length; i ++) {
                if (node.children[i].type === 'folder') {
                    node.children[i] = this.getModifiedData(node.children[i]);
                }
            }
        node.children = node.children.filter((value, index) => {
            return value.modified === true;
        });
        if (node.children && node.children.length > 0) node.modified = true;

        return node;
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

    commitFile(message, modifiedCursor, userName, email, project,accessToken) {
        try{
            axios.get('https://api.github.com/repos/' + userName + '/' + project + '/contents' + modifiedCursor.path, { headers: { 'Authorization': 'token ' + accessToken } }).then(res => {
                let shaKey = res.data.sha;
                let decodedValue = Buffer.from(modifiedCursor.content).toString('base64');
                axios.put('https://api.github.com/repos/' + userName + '/' + project + '/contents' + modifiedCursor.path, {
                    "message": message,
                    "committer": {
                        "name": userName,
                        "email": email
                    },
                    "content": decodedValue,
                    "sha": shaKey
                }, { headers: { 'Authorization': 'token ' + accessToken } }).
                    catch(err => {
                        console.log(err);
                    });
            }).catch(() => {
                let decodedValue = Buffer.from(modifiedCursor.content).toString('base64');
                axios.put('https://api.github.com/repos/' + userName + '/' + project + '/contents' + modifiedCursor.path, {
                    "message": message,
                    "committer": {
                        "name": userName,
                        "email": email
                    },
                    "content": decodedValue
                }, { headers: { 'Authorization': 'token ' + accessToken } }).
                    catch(err => {
                        console.log(err);
                    });
            });
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

    commit(node, message) {
        this.commitCode(node, message);
        this.state.cursor.oldcontent = this.state.cursor.content;
        this.props.history.push({
            state: {...this.props.location.state, data: this.updateData(this.state.data), cursor: this.state.cursor}
        });
        this.setState({modifiedTree : {
            "name": this.state.data.name,
            "type": this.state.data.type,
            "path": this.state.data.path,
            "toggled": true,
            "children": []
        }})
        document.getElementById("commitMsg").value = null;
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
                    {localStorage.uid && <Fragment style={{fontFamily: 'Source Sans Pro,Open Sans,Segoe UI,sans-serif'}}>
                        <div className="commit_box">
                            <input className="commit_input" id="commitMsg" spellCheck="false" autoComplete="off" placeholder="Commit messages"></input>
                            <button className="commit_btn" onClick={() => this.commit(this.state.modifiedTree, document.getElementById("commitMsg").value)}>Commit</button>
                        </div>
                        <div style={{...defaultStyles.component, top: '0'}}>
                            <Treebeard
                                style={defaultStyles}
                                data={this.state.modifiedTree}
                                onToggle={this.onToggle}
                                decorators={{ ...decorators, Toggle, Header }}
                            />
                        </div>
                    </Fragment>}
                </div>
            </div>
        );
    }
}

export default withRouter(Github);