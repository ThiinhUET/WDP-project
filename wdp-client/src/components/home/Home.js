import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import logo from '../../assets/logo.png';
import logo3D from '../../assets/logo3D.gif';
import Authenticate from '../../Authenticate';
import UserInfo from '../user-info/UserInfo';
import Background from '../background/Background';

class Home extends Component {
    constructor(props) {
        super(props);
        localStorage.setItem('currentPage', '/home');
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
                <Background width = '70%' />
                <div className="header">
                    <div className="header_left">
                        <button className="homebtn" title="Home" onClick={() => this.returnHome()}>
                            <img src={logo} className="App-logo" alt="logo" width={40} height={40} />
                        </button>
                        <span className="title">WDP</span>
                    </div>
                    <div className="header_right">
                        {!localStorage.isAuth && <button className="signin" onClick={() => this.openSignIn()}>Sign In</button>}
                        <UserInfo currentPage={"home"}/>
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