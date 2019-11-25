import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Authenticate from '../../../common/authprovider/Authenticate';
import { contentFlow } from '../../../../services';
import { defaultdata } from '../sidebar/explorer/data';
import axios from 'axios';
import 'antd/dist/antd.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Github extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            codeToCommit: "",
            data: (location.state && location.state.data) ? location.state.data : defaultdata,
            cursor: (location.state && location.state.cursor) ? location.state.cursor : '',
        }
    }

    componentDidMount() {
        this.props.history.listen((location) => this.setState({
            data: (location.state && location.state.data) ? location.state.data : this.state.data,
            cursor: (location.state && location.state.cursor) ? location.state.cursor : this.state.cursor,
        }))
    }

    signIn() {
        const authenticate = new Authenticate();
        authenticate.signin(() => this.props.history.push('/editor'));
    }

    createNotification = (type) => {
        return () => {
          switch (type) {
            case 'info':
              NotificationManager.info('Info message');
              break;
            case 'success':
              NotificationManager.success('Success message', 'Commit Success !');
              break;
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        };
      };

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
                                // this.createNotification('success');
                                console.log("done !");
                            }).catch(err => {
                                this.createNotification('error');
                            });
                    }).catch(err => {
                        console.log("Lỗi ở get content");
                    });
            }
        });
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
                    <input id="commitMsg" placeholder="Commit messages" style={{ flex: '1', display: 'block', color : 'black' }}></input>
                    <button onClick={() => this.commitCode()} style={{ background: 'green', cursor: 'pointer' }}>Commit Changes</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Github);