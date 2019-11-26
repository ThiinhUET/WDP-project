import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {DiffEditor} from '@monaco-editor/react';

class Diff extends Component{
    render() {
        return (
             <div className="Diff" style = {{position: 'absolute', display: 'none', left: '255px', width: 'calc(100vw - 255px)', height: '100%', zIndex: '999'}}>
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