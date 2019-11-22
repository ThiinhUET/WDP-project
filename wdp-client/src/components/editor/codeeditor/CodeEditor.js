import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ControlledEditor } from "@monaco-editor/react";

import contentFlow from '../../../service/content.service';

import './style.css';

class CodeEditor extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            cursor: (location.state && location.state.cursor)? location.state.cursor : {"content": "<!-- Select a file to code -->"},
            theme: "dark",
            language: "html",
            isEditorReady: true,
        }
    }

    componentDidMount(){
        this.props.history.listen((location) => this.setState({
            cursor: (location.state && location.state.cursor)? location.state.cursor : {"content": "<!-- Select a file to code -->"},
        }))
    }

    handleEditorDidMount() {
        this.setState.isEditorReady = true;
    }

    handleEditorChange = (ev, value) => {
        contentFlow.next(value);
    }
    
    render() {
        return (
            <div className="CodeEditor">
                <ControlledEditor
                    height="100%"
                    width="100%"
                    theme={this.state.theme}
                    language={this.state.cursor.type || 'html'}
                    editorDidMount={this.handleEditorDidMount.bind(this)}
                    onChange={this.handleEditorChange.bind(this)}
                    value={this.state.cursor.content}
                />
            </div>
        );
    }
}

export default withRouter(CodeEditor);