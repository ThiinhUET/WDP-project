import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Authenticate from '../../authprovider/Authenticate';
import contentFlow from '../../../service/content.service';

class Github extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeToCommit : ""
        }
    }
    
    signIn() {
        const authenticate = new Authenticate();
        authenticate.signin(() => this.props.history.push('/editor'));
    }
    commitCode(){
        this.contenFlowSub = contentFlow.subscribe((value) => {
            console.log(value);
            this.setState({commitCode : value});
            console.log(this.state.codeToCommit);
        });
    }
    render() {
        return (
            <div className="SidebarElement">
                <div className="sidebar_title">GITHUB</div>
                <div className="sidebar_element">
                    {!localStorage.uid && <div className="signin_git_button" onClick={() => this.signIn()}>
                        <i className="fab fa-github" style={{width: '18px', height: '18px', paddingRight: '5px'}}></i>
                        <span>Sign in with GitHub</span>
                    </div>}
                    <input placeholder ="Commit messages" style = {{flex : '1', display :'block'}}></input>
                    <button onClick = {() => this.commitCode()} style = {{background : 'green', cursor : 'pointer'}}>Commit Changes</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Github);