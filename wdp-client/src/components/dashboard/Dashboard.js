import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import spinnerImage from '../../assets/spinner.gif';
import logo from '../../assets/logo.png';

import UserInfo from '../user-info/UserInfo';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        
    }

    returnHome() {
        this.props.history.push('/home');
    }
    
    openEditor(project) {
        this.props.history.push({
            pathname: '/editor/' + project,
            state: {hi: project}
        });
    }
    
    render() {
        return (
            <div className="Dashboard">
                <div className="header">
                    <div className="header_left">
                        <button className="homebtn" title="Home" onClick={() => this.returnHome()}>
                            <img src={logo} className="App-logo" alt="logo" width={40} height={40} />
                        </button>
                        <span className="title">Dashboard</span>
                    </div>
                    <div className="header_right">
                        <UserInfo />
                    </div>
                </div>
                <button onClick={() => this.openEditor("hello")}>
                    Editor
                </button>
            </div>
        );
    }
}

export default withRouter(Dashboard);