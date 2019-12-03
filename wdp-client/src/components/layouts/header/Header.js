import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import logo from '../../../assets/logo.png';
import UserInfo from '../../layouts/user-info/UserInfo';

import './style.css';

class Header extends Component {
    returnHome() {
        this.props.history.push('/home');
    }

    openSignIn() {
        this.props.history.push('/signin');
    }
    
    render() {
        return (
            <div className="header">
                <div className="header_left">
                    <button className="homebtn" title="Home" onClick={() => this.returnHome()}>
                        <img src={logo} className="App-logo" alt="logo" width={40} height={40} />
                    </button>
                    <span className="title">{this.props.title}</span>
                </div>
                <div className="header_right">
                    {!localStorage.uid && this.props.page !== "signin" && <button className="signin" onClick={() => this.openSignIn()}>Sign In</button>}
                    <UserInfo />
                </div>
            </div>
        );
    }
}

export default withRouter(Header);