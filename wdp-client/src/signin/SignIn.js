import React, { Component } from 'react';
import { withRouter, BrowserRouter, Route } from 'react-router-dom';
import '.././css/background_style.css';
import './css/style.css';
import logo from '.././assets/logo.png';
import logo2 from '.././assets/logo2.png';
import '@fortawesome/fontawesome-free/js/all';
import Auth from '.././Authenticate';
import axios from 'axios';
import Home from '../home/Home';



class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserDrop: false,
            email: null,
            displayName: null,
        }
    }

    handSignIn() {
        
        Auth.signin(() => {
            this.props.history.push('/home');
        });
    }

    returnHome() {
        this.props.history.push('/home');
    }
    openSignUp() {
        this.props.history.push('/signup');
    }
    render() {
        return (
            <div className="signin">
                <div className="background">
                    <div className="shooting_star"></div>
                    <div className="shooting_star"></div>
                    <div className="shooting_star"></div>
                    <div className="shooting_star"></div>
                    <div className="shooting_star"></div>
                    <div className="shooting_star"></div>
                    <div className="shooting_star"></div>
                    <div className="shooting_star"></div>
                    <div className="shooting_star"></div>
                    <div className="shooting_star"></div>
                    <div className="shooting_star"></div>
                </div>
                <div className="header">
                    <div className="header_left">
                        <button className="homebtn" title="Home" onClick={() => this.returnHome()}>
                            <img src={logo} className="App-logo" alt="logo" width={40} height={40} />
                        </button>
                        <span className="title">WDP</span>
                    </div>
                </div>
                <div className="maincontent">
                    <div className="signin_title">Sign in to WDP</div>
                    <div className="signin_box">
                        <img src={logo2} style={{ position: 'relative', width: '70%', margin: '0 auto', marginTop: '20px' }} />
                        <div className="signin-divider">
                            <div className="bar bar-top" />
                            <span className="signin-or">OR</span>
                            <div className="bar bar-bottom" />
                        </div>
                        <button className="signin_git_button" onClick={() => this.handSignIn()}>
                            Log In With Github</button>
                    </div>
                </div>
                <div className="footer">
                    <span>v1.0</span>
                    <span>© 2019 Web Development Platform | Develop by HoiThanhDucChuaTroi</span>
                </div>
            </div>
        );
    }
}

export default withRouter(SignIn);