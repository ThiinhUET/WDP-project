import React, { Component } from 'react';
import file from './sidebar/data';
class MyFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <iframe srcDoc={this.props.code} style={{ display: 'flex', flex: '1', height: '100%', width: '100%', background: 'white' }}></iframe>
        );
    }
}

export default MyFrame;