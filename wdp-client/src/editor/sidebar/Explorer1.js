import React, { Component } from 'react';
import FileExplore from '../FileExplore';
class Explorer extends Component {
    render() {
        return (
            <div style={{textAlign: 'center',width: '200px',height: '100%', margin: '10px auto', color: '#f0f0f0', fontFamily: 'Source Sans Pro,Open Sans,Segoe UI,sans-serif', fontWeight: '600'}}>
                EXPLORER
                <FileExplore />
            </div>
        );
    }
}

export default Explorer;