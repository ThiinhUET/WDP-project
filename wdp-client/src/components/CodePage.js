import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {render} from 'react-dom';
import logo from '.././assets/logo.png';
import './style.css';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import '@fortawesome/fontawesome-free/js/all';

class CodePage extends Component {
    constructor(props) {
        super(props);
    }
    onChange(newValue) {
        console.log("change", newValue);
    }
    returnHome(){
        this.props.history.push('/home');
    }
    openSignIn(){
        this.props.history.push('/signin');
    }
    openSignUp(){
        this.props.history.push('/signup');
    }
    render() { 
        return (
            <div className="CodePage">
                <div className="header" style={{margin: '0 0 10px 0'}}>
                    <button className="home" style={{ height: '42px' }} onClick={() => this.returnHome()}>
                        <a style={{ textDecoration: 'none' }}><img src={logo} className="App-logo" alt="logo" width={40} height={40} /></a>
                    </button>
                    <button className="signin">
                        <a style={{ textDecoration: 'none', color: '#ffffff' }} onClick={() => this.openSignIn()}><span>Sign In</span></a>
                    </button>
                    <button className="signup">
                        <a style={{ textDecoration: 'none', color: '#ffffff' }} onClick = {() => this.openSignUp()}><span>Sign Up</span></a>
                    </button>
                </div>
                <div className="maincontent" style={{position: 'relative', display: 'flex', flexDirection: 'row'}}>
                    <div className="filebar">
                        <div className="shortcut">
                            <i class="fas fa-file" style={{width: '30px', height: '30px', color: '#1e1e1f', margin: '10px auto'}}></i>
                            <i class="fas fa-search" style={{width: '30px', height: '30px', color: '#1e1e1f', margin: '10px auto'}}></i>
                            <i class="fas fa-cogs" style={{width: '30px', height: '30px', color: '#1e1e1f', margin: '10px auto'}}></i>
                            <i class="fab fa-github" style={{width: '30px', height: '30px', color: '#1e1e1f', margin: '10px auto'}}></i>
                        </div>
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
                                width: '90%',
                                height: '100%'
                            }} 
                    />
                </div>
            </div>
        );
    }
}
 
export default withRouter(CodePage);