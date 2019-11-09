import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import spinnerImage from '../../assets/spinner.gif';
import logo from '../../assets/logo.png';

import UserInfo from '../user-info/UserInfo';

class Dashboard extends Component {
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
                        {!localStorage.uid && <button className="signin" onClick={() => this.openSignIn()}>Sign In</button>}
                        <UserInfo />
                    </div>
                </div>
                 <button>
                     <a href="#">Editor</a>
                 </button>
            </div>
        );
    }
}

export default withRouter(Dashboard);