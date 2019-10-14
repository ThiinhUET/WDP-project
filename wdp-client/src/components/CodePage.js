import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {render} from 'react-dom';

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
            <AceEditor 
            mode = 'java' 
            theme = 'github' 
            onChange={this.onChange()}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            style = {
                {
                    width: '100%',
                    height: '1000px'
                }
            } />
        );
    }
}
 
export default withRouter(CodePage);