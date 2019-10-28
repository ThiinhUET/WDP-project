import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import '.././css/background_style.css';
import './css/style.css';
import logo from '.././assets/logo.png';
import logo2 from '.././assets/logo2.png';
import '@fortawesome/fontawesome-free/js/all';
import Auth from '.././Authenticate';
import axios from 'axios';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : ''
        }
    }

    handSignIn(event){
        // var baseApi = "http://localhost:8080/users/";
        // var self = this;
        // var payload = {
        //     "username" : this.state.username,
        //     "password" : this.state.password
        // }
        // axios.post(baseApi + 'authenticate',payload).then(
        //     function(res){
        //         console.log(res);
                
        //         if(res.message === "user founded!"){
        //             this.props.history.push('/home');                   
        //         }
        //         else if(res.message === "Invalid username/password!!!"){
        //             this.props.history.push('/signup');
                    
        //         }
        //     }
        // )
        Auth.signin(() => {
            this.props.history.push('/home')
        });
    }
   
    returnHome(){
        this.props.history.push('/home');
    }
    openSignUp(){
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
                        <button className="homebtn" title="Home" onClick = {() => this.returnHome()}>
                            <img src={logo} className="App-logo" alt="logo" width={40} height={40} />
                        </button>
                        <span className="title">WDP</span>
                    </div>
                </div>
                <div className="maincontent">
                    <div className="signin_title">Sign in to WDP</div>
                    <div className="signin_box">
                        <img src={logo2} style={{position: 'relative', width: '70%', margin: '0 auto', marginTop: '20px'}} />
                        <form className="signin_input" style={{position: 'relative', marginTop: '30px'}}>
                            <div className="box_input">
                                <span className="fa fa-user" />
                                <input type="text" id="username" placeholder="Username" required onChange = {(event) => this.setState({username : event.target.value})} />
                            </div>
                            <div className="box_input">
                                <span className="fa fa-lock" />
                                <input type="password" id="password" placeholder="Password" required onChange = {(event) => this.setState({password : event.target.value})}/>
                            </div>
                            <div className="links">
                                <p><a href="https://github.com/password_reset" style={{textDecoration: 'none'}}>Forgot Password?</a></p>
                            </div>
                            <button className="signin_button" onClick = {(event) => this.handSignIn(event)}>Sign in</button>
                        </form>	
                        <div className="signin-divider">
                            <div className="bar bar-top" />
                            <span className="signin-or">OR</span>
                            <div className="bar bar-bottom" />
                        </div>
                        <button className="signin_git_button">
                            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style={{verticalAlign: 'middle', marginRight: '0.5rem'}}>
                            <g>
                                <path d="m20 0c-11 0-20 9-20 20 0 8.8 5.7 16.3 13.7 19 1 0.2 1.3-0.5 1.3-1 0-0.5 0-2 0-3.7-5.5 1.2-6.7-2.4-6.7-2.4-0.9-2.3-2.2-2.9-2.2-2.9-1.9-1.2 0.1-1.2 0.1-1.2 2 0.1 3.1 2.1 3.1 2.1 1.7 3 4.6 2.1 5.8 1.6 0.2-1.3 0.7-2.2 1.3-2.7-4.5-0.5-9.2-2.2-9.2-9.8 0-2.2 0.8-4 2.1-5.4-0.2-0.5-0.9-2.6 0.2-5.3 0 0 1.7-0.5 5.5 2 1.6-0.4 3.3-0.6 5-0.6 1.7 0 3.4 0.2 5 0.7 3.8-2.6 5.5-2.1 5.5-2.1 1.1 2.8 0.4 4.8 0.2 5.3 1.3 1.4 2.1 3.2 2.1 5.4 0 7.6-4.7 9.3-9.2 9.8 0.7 0.6 1.4 1.9 1.4 3.7 0 2.7 0 4.9 0 5.5 0 0.6 0.3 1.2 1.3 1 8-2.7 13.7-10.2 13.7-19 0-11-9-20-20-20z" />
                            </g>
                            </svg>
                            <a style={{textDecoration: 'none', color: '#fff'}} href="https://github.com/signin/oauth/authorize?client_id=3867115e991d51f86f14">Sign in with github</a>
                        </button>
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