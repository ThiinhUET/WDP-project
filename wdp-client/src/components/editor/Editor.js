import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Controlled as CodeMirror } from 'react-codemirror2';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import axios from 'axios';
import 'codemirror/theme/mbo.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import './css/codemirror.css';

import MenuBar from './MenuBar';
import SideBar from './SideBar';
import MyTerminal from '../terminal/Terminal';
import Authenticate from '../../Authenticate';
import UserInfo from '../user-info/UserInfo';
import TextInput from '../terminal/inputText';

import '@fortawesome/fontawesome-free/js/all';
import logo from '../../assets/logo.png';
import './css/editor.css';
class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openConsole: "false",
            id: "",
            html: "",
            css: "",
            js: ""
        };

        this.pusher = new Pusher("18160601861a89d7f8f7", {
            cluster: "eu",
            forceTLS: true
        });

        this.channel = this.pusher.subscribe("editor");
        localStorage.setItem('currentPage', '/editor');
    }

    
    componentDidUpdate() {
        this.runCode();
    }

    componentDidMount() {
        this.setState({
            id: pushid()
        });

        this.channel.bind("text-update", data => {
            const { id } = this.state;
            if (data.id === id) return;

            this.setState({
                html: data.html,
                css: data.css,
                js: data.js
            });
        });
    }

    syncUpdates = () => {
        const data = { ...this.state };
    };

    runCode = () => {
        const { html, css, js } = this.state;

        const iframe = this.refs.iframe;
        const document = iframe.contentDocument;
        const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              body {
                  color: white;
              }
              ${css}
            </style>
          </head>
          <body>
            ${html}
    
            <script type="text/javascript">
              ${js}
            </script>
          </body>
          </html>
        `;

        document.open();
        document.write(documentContents);
        document.close();
    };

    returnHome(){
        this.props.history.push('/home');
    }
    openSignIn(){
        this.props.history.push('/signin');
    }
    openSignUp(){
        this.props.history.push('/signup');
    }
    openConsole() {
        this.setState({openConsole: !this.state.openConsole});
        if (this.state.openConsole) {
            document.getElementById("console_container").style.display = "block";
            document.getElementById("footer_bar").style.marginTop = "0";
            document.getElementById("iframe").style.height = 'calc(65% + 5px)';
            
            
        }
        else {
            document.getElementById("console_container").style.display = "none";
            document.getElementById("footer_bar").style.marginTop = "5px";
            document.getElementById("iframe").style.height = 'calc(95% + 5px)';
        }
        
    }
    closeConsole() {
        this.setState({openConsole: "false"});
        document.getElementById("console_container").style.display = "none";
        document.getElementById("footer_bar").style.marginTop = "5px";
        document.getElementById("iframe").style.height = 'calc(95% + 5px)';
    }
    render() {
        const { html, js, css } = this.state;
        const codeMirrorOptions = {
            theme: "mbo",
            lineNumbers: true,
            scrollbarStyle: null,
            lineWrapping: true
        };

        return (
            <div className="Editor">
                <div className="header" style={{margin: '0 0 7px 0'}}>
                    <div className="header_left">
                        <button className="homebtn" title="Home" onClick={() => this.returnHome()}>
                            <img src={logo} className="App-logo" alt="logo" width={40} height={40} />
                        </button>
                        <MenuBar />
                    </div>
                    <div className="header_right">
                        {!localStorage.isAuth && <button className="signin" onClick={() => this.openSignIn()}>Sign In</button>}
                        <UserInfo currentPage={"editor"}/>
                    </div>
                </div>
                <div className="maincontent" style={{position: 'relative', display: 'flex', flexDirection: 'row', height: 'calc(94vh - 15px)'}}>
                    <SideBar />
                    <section className="playground">
                        <div className="code-editor html-code" style={{flex: '1'}}>
                            <div className="editor-header">HTML</div>
                            <CodeMirror id="html-code"
                                value={html}
                                options={{
                                    mode: "htmlmixed",
                                    ...codeMirrorOptions
                                }}
                                onBeforeChange={(editor, data, html) => {
                                    this.setState({ html }, () => this.syncUpdates());
                                }}
                            />
                        </div>
                        <div className="code-editor css-code" style={{flex: '1'}}>
                            <div className="editor-header">CSS</div>
                            <CodeMirror
                                value={css}
                                options={{
                                    mode: "css",
                                    ...codeMirrorOptions
                                }}
                                onBeforeChange={(editor, data, css) => {
                                    this.setState({ css }, () => this.syncUpdates());
                                }}
                            />
                        </div>
                        <div className="code-editor js-code" style={{flex: '1'}}>
                            <div className="editor-header">JS</div>
                            <CodeMirror
                                value={js}
                                options={{
                                    mode: "javascript",
                                    ...codeMirrorOptions
                                }}
                                onBeforeChange={(editor, data, js) => {
                                    this.setState({ js }, () => this.syncUpdates());
                                }}
                            />
                        </div>
                    </section>
                    <div className="resizer"></div>
                    <section className="result">
                        <iframe title="result" className="iframe" id="iframe" ref="iframe"/>
                        <div className="console_contaniner" id="console_container">
                            <div className="console_tab" id="console_tab">
                                <button style={{float: 'left'}}>
                                    <i className="fas fa-ban"></i>
                                </button>
                                <button style={{float: 'right'}} onClick={() => this.closeConsole()}>
                                    <i className="fas fa-chevron-down"></i>
                                </button>
                            </div>
                        </div>
                        <TextInput></TextInput>
                        <div className="footer_bar" id="footer_bar">
                            <button className="header_item" title="Save">
                                <span>
                                    <i className="fas fa-cloud" style={{width: '20px', height: '20px'}}></i>
                                </span>
                            </button>
                            <button className="header_item" title="Settings">
                                <span>
                                    <i className="fas fa-cogs" style={{width: '20px', height: '20px'}}></i>
                                </span>
                            </button>
                            <button className="header_item" title="GitHub">
                                <span>
                                    <i className="fab fa-github" style={{width: '20px', height: '20px'}}></i>
                                </span>
                            </button>
                            <button className="header_item" title="Export to zip">
                                <span>
                                    <i className="fas fa-download" style={{width: '20px', height: '20px'}}></i>
                                </span>
                            </button>
                            <button onClick={() => this.openConsole()}>
                                Console
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default withRouter(Editor);
