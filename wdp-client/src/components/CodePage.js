import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class CodePage extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <h1 style={{ background: 'white' }}>This is code page</h1>
        );
    }
}
 
export default withRouter(CodePage);