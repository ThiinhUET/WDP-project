import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from '.././assets/logo.png';
import '@fortawesome/fontawesome-free/js/all';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import axios from 'axios';
import './css/editor.css';
import './css/codemirror.css';
import 'codemirror/theme/mbo.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import FileBar from './filebar';
import SideBar from './SideBar';
class Editor extends Component {
    constructor() {
        super();
        this.state = {
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

        axios
            .post("http://localhost:8080/update-editor", data)
            .catch(console.error);
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
                <div className="header" style={{margin: '0 0 10px 0'}}>
                    <button className="homebtn" title="Home" style={{ height: '42px' }} onClick={() => this.returnHome()}>
                        <a style={{ textDecoration: 'none' }}><img src={logo} className="App-logo" alt="logo" width={40} height={40} /></a>
                    </button>
                    <FileBar />
                    <button className="signin">
                        <a style={{ textDecoration: 'none', color: '#ffffff' }} onClick={() => this.openSignIn()}><span>Sign In</span></a>
                    </button>
                    <button className="signup">
                        <a style={{ textDecoration: 'none', color: '#ffffff' }} onClick = {() => this.openSignUp()}><span>Sign Up</span></a>
                    </button>
                </div>
                <div className="maincontent" style={{position: 'relative', display: 'flex', flexDirection: 'row'}}>
                    <SideBar />
                    <section className="playground">
                        <div className="code-editor html-code" style={{flex: '1'}}>
                            <div className="editor-header">HTML</div>
                            <CodeMirror
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
                        <iframe title="result" className="iframe" ref="iframe" />
                    </section>
                </div>
            </div>
        );
    }
}

export default withRouter(Editor);