import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {DiffEditor} from '@monaco-editor/react';

class Diff extends Component{
    render() {
        return (
             <div style = {{width : '100%', height : '100vh'}}>
                 <DiffEditor
                    original = "<h1>Hello Thinh</h1>"
                    modified = "<h1>Hello Thinh modified</h1>"
                    language = "html"
                    theme = "dark"
                    width = "100%"
                    height = "100%"
                 />
             </div>
        );
    }
}

export default withRouter(Diff);