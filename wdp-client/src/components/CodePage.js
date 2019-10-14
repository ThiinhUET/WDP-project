import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {render} from 'react-dom';
import logo from '.././assets/logo.png';

import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

class CodePage extends Component {
    constructor(props) {
        super(props);
    }
    onChange(newValue) {
        console.log("change", newValue);
    }

    render() { 
        return (
            <div className="CodePage">
                <div className="header" style={{margin: '0 0 10px 0'}}>
                    <button className="home" style={{ height: '42px' }} onClick={() => this.openSignIn()}>
                        <a style={{ textDecoration: 'none' }}><img src={logo} className="App-logo" alt="logo" width={40} height={40} /></a>
                    </button>
                    <button className="signin" onClick={() => this.openSignIn()}>
                        <a style={{ textDecoration: 'none', color: '#ffffff' }}><span>Sign In</span></a>
                    </button>
                    <button className="signup" onClick = {() => this.openSignUp()}>
                        <a style={{ textDecoration: 'none', color: '#ffffff' }}><span>Sign Up</span></a>
                    </button>
                </div>
                <AceEditor 
                mode = 'java' 
                theme = 'xcode' 
                onChange={this.onChange()}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                style = {
                    {
                        background: '#1e1e1e',
                        color: '#fff',
                        width: '100%',
                        height: '1000px'
                    }
                } />
            </div>
        );
    }
}
 
export default withRouter(CodePage);