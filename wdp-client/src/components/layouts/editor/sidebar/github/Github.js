import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Authenticate from '../../../../common/authprovider/Authenticate';
import { contentFlow } from '../../../../../services';
import { defaultdata } from '../data';
import axios from 'axios';
import { Icon, notification} from "antd";

import { Treebeard, decorators } from 'react-treebeard';
import defaultStyles from '../defaultStyles';
import Header from '../Header';
import Toggle from '../Toggle';


class Github extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        let newData = (location.state && location.state.data) ? location.state.data : defaultdata;
        this.state = {
            codeToCommit: "",
            data: newData,
            modifiedData: {
                "path": newData.path,
                "type": newData.type,
                "name": newData.name,
                "toggled": true,
                "content": "",
                "children": []
            },
            cursor: (location.state && location.state.cursor) ? location.state.cursor : '',
            modifiedCursor: (location.state && location.state.modifiedCursor) ? location.state.modifiedCursor : '',
        }
    }

    componentDidMount() {
        this.props.history.listen((location) => this.setState({
            data: (location.state && location.state.data) ? location.state.data : this.state.data,
            cursor: (location.state && location.state.cursor) ? location.state.cursor : this.state.cursor,
            modifiedCursor: (location.state && location.state.modifiedCursor) ? location.state.modifiedCursor : this.state.modifiedCursor,
        }));
        console.log(this.state.data);
        let children = this.state.data.children;
        for(let i = 0 ; i < children.length; i++){
            if(children[i].modified === true){
            }
        }
    }

    signIn() {
        const authenticate = new Authenticate();
        authenticate.signin(() => this.props.history.push('/editor'));
    }

    commitCode() {
        this.contenFlowSub = contentFlow.subscribe((value) => {
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
        });
    }

    openNotification = succces => {
        if (succces)
          notification.open({
            message: "Succces",
            description: "Gửi action thành công",
            icon: <Icon type="smile" style={{ color: "#108ee9" }} />
          });
        else {
          notification.open({
            message: "Error",
            description: "Bị lỗi rồi",
            icon: <Icon type="smile" rotate={180} style={{ color: "#108ee9" }} />
          });
        }
    }

    getModifiedData(data) {
        let modifiedData;
        if (data.type !== 'folder' && data.modified === true) modifiedData = data;
        if (data.type === 'folder' && data.children) {
            let checkModified = false;
            for (let i = 0; i < data.children.length; i ++) {
                if (data.children[0])
            }
        }
        return modifiedData;
    }

    onToggle(node, toggled) {
        const { modifiedCursor, modifiedData } = this.state;
        
        if (modifiedCursor) {
            this.setState(() => ({ modifiedCursor, active: false }));
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        if (node.type !== 'folder'){
            this.props.history.push({
                state: { ...this.props.location.state, modifiedCursor: node }
            });
        } 
        this.setState(() => ({ cursor: node, data: Object.assign({}, modifiedData) }));
    }
    
    render() {
        const { modifiedData } = this.state;
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
                    <div style={{...defaultStyles.component, top: '0'}}>
                        <Treebeard
                            style={defaultStyles}
                            data={modifiedData}
                            onToggle={this.onToggle}
                            decorators={{ ...decorators, Toggle, Header }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Github);