import React, { Component } from 'react';
import '.././css/style.css';
import '.././css/background_style.css';
import {withRouter} from 'react-router-dom';
import logo from '.././assets/logo.png';
import logo3D from '.././assets/logo3D.gif';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            isUserDrop: false,
        }
    }

    openEditor() {
        this.props.history.push('/editor');
    }
    openSignIn(){
        this.setState({auth: true});
    }
    openSignUp(){
        this.props.history.push('/signup');
    }

    returnHome(){
        this.props.history.push('/home');
    }
    userDrop() {
        this.setState({isUserDrop: !this.state.isUserDrop});
    }
    signOut() {
        this.setState({auth: false});
    }
    render() { 
        return (
            <div className="Home">
                <div className="background" style={{width: '70%'}}>
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
                    <div className="header_right">
                        {!this.state.auth && <button className="signin" onClick={() => this.openSignIn()}>Sign In</button>}
                        {this.state.auth && <span className="user" onClick={() => this.userDrop()}>
                            <span className="username">User</span>
                            <button className="avatar">
                                <i class="fas fa-user-circle" style={{width: '30px', height: '30px', color: 'white'}}></i>
                            </button>
                            {this.state.isUserDrop && <div className="userdrop_container">
                                <div className="signout" onClick={() => this.signOut()}>
                                    <i class="fas fa-sign-out-alt" style={{paddingRight: '10px'}}></i>
                                    Sign out
                                </div>
                            </div>}
                        </span>}
                    </div>
                </div>
                <div className="maincontent">
                    <div className="code_editor" style={{ position: 'relative', flex: 3 }}>
                        <div className="title_code">
                            <div className="name">WEB DEVELOPMENT PLATFORM</div>
                            <div className="other_name">
                                <div>The online code editor</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <button className="button_code" onClick={() => this.openEditor()}>
                                        <a style={{ textDecoration: 'none' }} >Start Coding</a>
                                    </button>
                                    <span style={{ fontSize: '48pt' }}>for Web</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="logo" style={{ position: 'relative', flex: 1 }}>
                        <img src={logo3D} alt="loading..." style={{ width: '300px', height: '300px' }} />
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
 
export default withRouter(Home);