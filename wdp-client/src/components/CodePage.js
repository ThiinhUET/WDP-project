import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class CodePage extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <h1>Code page</h1>
        );
    }
}
 
export default withRouter(CodePage);