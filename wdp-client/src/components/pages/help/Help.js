import React, { Component } from 'react';

import './style.css';

class Help extends Component {
    render() {
        return (
            <div className="Help">
                <h1>Help</h1>
                <span>On the left corner, there are Explorer, Github and Export. </span>
                <ul>
                    <li>Explorer: There is sample project containing 3 files index.html, script.js, style.css. You can search your file in case your project is large.</li>
                </ul>
            </div>
        );
    }
}

export default Help;