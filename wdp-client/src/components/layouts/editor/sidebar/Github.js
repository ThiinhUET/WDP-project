import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Authenticate from '../../../common/authprovider/Authenticate';
import { contentFlow } from '../../../../services';
import { defaultdata } from '../sidebar/explorer/data';
import axios from 'axios';

class Github extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            codeToCommit: "",
            data: (location.state && location.state.data)? location.state.data : defaultdata,
            cursor: (location.state && location.state.cursor)? location.state.cursor : '',
        }
    }

    componentDidMount() {
        this.props.history.listen((location) => this.setState({
            data: (location.state && location.state.data)? location.state.data : this.state.data,
            cursor: (location.state && location.state.cursor)? location.state.cursor : this.state.cursor,
        }))
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
                axios.get('https://api.github.com/repos/' + userName + '/' + project + '/contents/' + fileName, { headers: {'Authorization': 'token ' + accessToken }}).
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
                    },{headers: {'Authorization': 'token ' + accessToken}}).
                    then(res1 => {
                        console.log(res1.data)
                    }).catch(err => {
                        console.log("Lỗi ở put data");
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
                <div className="sidebar_element" style = {{flexDirection : "column"}}>
                    {!localStorage.uid && <div className="signin_git_button" onClick={() => this.signIn()}>
                        <i className="fab fa-github" style={{ width: '18px', height: '18px', paddingRight: '5px' }}></i>
                        <span>Sign in with GitHub</span>
                    </div>}
                    <input id="commitMsg" placeholder="Commit messages" style={{ flex: '1', display: 'block' }}></input>
                    <button onClick={() => this.commitCode()} style={{ background: 'green', cursor: 'pointer' }}>Commit Changes</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Github);