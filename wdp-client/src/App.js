import React, { Component } from 'react';
import logo from './assets/logo.png'
import logo3D from './assets/logo3D.gif'
import './css/style.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="header">
                    <button className="home" style={{height: '42px'}}>
                        <a style={{textDecoration: 'none'}} href="./index.html"><img src={logo} className="App-logo" alt="logo" width={40} height={40} /></a>
                    </button>
                    <button className="signin">
                        <a href="./signin/signin.html" style={{textDecoration: 'none', color: '#ffffff'}}><span>Sign In</span></a>
                    </button>
                    <button className="signup">
                        <a href="./signup/signup.html" style={{textDecoration: 'none', color: '#ffffff'}}><span>Sign Up</span></a>
                    </button>
                </div>
                <div className="maincontent">
                    <div className="code_editor" style={{position: 'relative', flex: 3}}>
                        <div className="title_code">
                            <div className="name">WEB DEVELOPMENT PLATFORM</div>
                            <div className="other_name">
                                <div>The online code editor</div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <button className="button_code">
                                        <a href="./editor/editor.html" style={{textDecoration: 'none'}}>Start Coding</a>
                                    </button>
                                    <span style={{fontSize: '48pt'}}>for Web</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="logo" style={{position: 'relative', flex: 1}}>
                        <img src={logo3D} alt="loading..." style={{width: '300px', height: '300px'}} />
                    </div>
                </div>
                <div className="footer">
                    <span style={{float: 'left'}}>v1.0</span>
                    <span style={{float: 'right'}}>© 2019 Web Development Platform | Develop by HoiThanhDucChuaTroi</span>
                </div>
            </div>
        );
    }
}

export default App;