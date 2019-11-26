import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ControlledEditor } from '@monaco-editor/react';

import { contentFlow } from '../../../../services';

import './style.css';
import Loading from '../../loading/Loading';

class CodeEditor extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            cursor: (location.state && location.state.cursor)? location.state.cursor : {"content": "<!-- Select a file to code -->"},
            theme: "dark",
            isEditorReady: true,
        }
        contentFlow.next(this.state.cursor.content);
    }

    componentDidMount(){
        this.props.history.listen((location) => {
            this.setState({
                cursor: (location.state && location.state.cursor)? location.state.cursor : this.state.cursor,
            });
            contentFlow.next(this.state.cursor.content);
        });
    }

    handleEditorDidMount() {
        this.setState.isEditorReady = true;
    }

    handleEditorChange = (ev, value) => {
        contentFlow.next(value);
    }
    
    render() {
        const { theme, cursor } = this.state;
        return (
            <div className="CodeEditor">
                <ControlledEditor
                    loading={<Loading size='20' _zIndex = '-1'/>}
                    height="100%"
                    width="100%"
                    theme={theme}
                    language={cursor.type || 'html'}
                    editorDidMount={this.handleEditorDidMount.bind(this)}
                    onChange={this.handleEditorChange.bind(this)}
                    value={cursor.content}
                />
            </div>
        );
    }
}

export default withRouter(CodeEditor);