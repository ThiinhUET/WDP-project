import React, { Component } from 'react';

import './style.css';

class Help extends Component {
    render() {
        return (
            <div className="Help">
                <h1>Help</h1>
                <h3>On the left side, there are Explorer, Github and Export. </h3>
                <ul>
                    <li><h3>Explorer:</h3>
                        <ul>
                            <img src={require('./assets/file.png')} alt="" width="200px"/>
                            <li>There is sample project containing 3 files index.html, script.js, style.css if you open a new project.</li>
                            <li>Click on filename to show that file to coding editor.</li>
                            <img src={require('./assets/search_file.png')} alt="" width="200px"/>
                            <li>You can search your file in case your project is large.</li>
                            <img src={require('./assets/create_file.png')} alt="" width="200px"/>
                            <li>To add or delete file/folder, you can type path of file or folder and click ccorresponded button.</li>
                        </ul>
                    </li>
                    <li><h3>Github:</h3>
                        <ul>
                            <img src={require('./assets/Diff.png')} alt="" width="350px"/>
                            <li>When you are in Github tab, your coding panel will be splited in two columns which allow you to compare 2 code versions.</li>
                            <img src={require('./assets/Github_create.png')} alt="" width="200px"/>
                            
                            <li>If you open a new project, you can create new repository here with 3 input boxs and name box is required. After you click Create, a new project is created in Github with sample files auto commited.</li>
                            <img src={require('./assets/Github_commit.png')} alt="" width="200px"/>
                            <li>If you open a old project, you can commit modified files here. Type your message to the box and click Commit to commit your code.</li>
                        </ul>
                    </li>
                    <li><h3>Export:</h3>
                        <ul>
                            <li>You can download your entire project as zip file here, your project is required created in Github.</li>
                            <img src={require('./assets/Export.png')} alt="" width="200px"/>
                            <li>Select branch to download your code.</li>
                        </ul>
                    </li>
                </ul>
                <h3>In the middle, there is your coding editor.</h3>
                <h3>On the right side, there are your preview and console session.</h3>
                <ul>
                    <li><h3>Web Preview:</h3>
                        <ul>
                            <img src={require('./assets/Preview.png')} alt="" width="300px"/>
                            <li>Click Run whenever you want to compile you code.</li>
                            <li>Type the path of the html file into url navigation to show preview website.</li>
                        </ul>
                    </li>
                    <li><h3>Console:</h3>
                        <ul>
                            <img src={require('./assets/Console.png')} alt="" width="300px"/>
                            <li>Result of the command generated in the website is showed here.</li>
                            <li>You can also type the command into input box to show the result.</li>
                            <li>Click Console button or <img src={require('./assets/chevron_btn.png')} alt="" width="20px"/> to hide the console session, if you want to show, click Console button again.</li>
                            <li>Click <img src={require('./assets/ban_btn.png')} alt="" width="20px"/> to clear console result.</li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Help;