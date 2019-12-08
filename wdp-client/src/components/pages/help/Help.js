import React, { Component } from 'react';

import './style.css';

class Help extends Component {
    render() {
        return (
            <div className="Help">
                <h1>Help</h1>
                <span>On the left side, there are Explorer, Github and Export. </span>
                <ul>
                    <li>Explorer: There is sample project containing 3 files index.html, script.js, style.css. You can search your file in case your project is large.</li>
                    <li>Github: You can create new repository here. When you are in Github tab, your coding panel will be splited in two columns which allow you to compare 2 code versions.</li>
                    <li>Export: You can download you entire project as zip file here.</li>
                </ul>
                <span>In the middle, there is your coding editor.</span> <br/> <br/>
                <span>On the right side, there are your preview and console session. Click to Run whenever you want to compile you code.</span>
            </div>
        );
    }
}

export default Help;