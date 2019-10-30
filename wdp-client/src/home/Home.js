import React, { Component } from 'react';
import '.././css/style.css';
import '.././css/background_style.css';
import {withRouter} from 'react-router-dom';
import logo from '.././assets/logo.png';
import logo3D from '.././assets/logo3D.gif';
import Auth from '../Authenticate';
import UserAuth from '../user-auth/UserAuth';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    openEditor() {
        this.props.history.push('/editor');
    }
    openSignIn(){
        this.props.history.push('/signin');
    }
    openSignUp(){
        this.props.history.push('/signup');
    }
    returnHome(){
        this.props.history.push('/home');
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
                        {!Auth.isAuthenticated && <button className="signin" onClick={() => this.openSignIn()}>Sign In</button>}
                        <UserAuth currentPage={"home"}/>
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