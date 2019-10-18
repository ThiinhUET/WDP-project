import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import Explorer from './sidebar/Explorer';
import Configuration from './sidebar/Configuration';
import Github from './sidebar/Github';
import './css/sidebar.css'

class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isExplorerAppear: false,
            isConfigurationAppear: false,
            isGithubAppear: false
        }
    }
    changeExplorerAppearance = () => {
        this.setState({
            ...this.state,
            isExplorerAppear: !this.state.isExplorerAppear,
            isConfigurationAppear: false,
            isGithubAppear: false
        })
    }
    changeConfigurationAppearance = () => {
        this.setState({
            ...this.state,
            isConfigurationAppear: !this.state.isConfigurationAppear,
            isExplorerAppear: false,
            isGithubAppear: false
        })
    }
    changeGithubAppearance = () => {
        this.setState({
            ...this.state,
            isGithubAppear: !this.state.isGithubAppear,
            isExplorerAppear: false,
            isConfigurationAppear: false
        })
    }
    explorer() {
        this.changeExplorerAppearance();
        var x = document.getElementById("explorer");
        if (x.className === "icon") {
            x.className += " responsive";
            document.getElementById("configuration").className = "icon";
            document.getElementById("github").className = "icon";
        }
        else x.className = "icon";
    }
    configuration() {
        this.changeConfigurationAppearance();
        var x = document.getElementById("configuration");
        if (x.className === "icon") {
            x.className += " responsive";
            document.getElementById("explorer").className = "icon";
            document.getElementById("github").className = "icon";
        }
        else x.className = "icon";
    }
    github() {
        this.changeGithubAppearance();
        var x = document.getElementById("github");
        if (x.className === "icon") {
            x.className += " responsive";
            document.getElementById("explorer").className = "icon";
            document.getElementById("configuration").className = "icon";
        }
        else x.className = "icon";
    }
    render() {
        return (
            <div className="sidebar">
                <div className="sbar_icons">
                    <div className="icon" id="explorer" title="Explorer" onClick={() => this.explorer()}>
                        <i className="fas fa-file" id="icon" style={{width: '25px', height: '25px', color: '#ccc', margin: '10px auto'}}></i>
                    </div>
                    <div className="icon" id="configuration" title="Configuration Files" onClick={() => this.configuration()}>
                        <i className="fas fa-cogs" style={{width: '25px', height: '25px', color: '#ccc', margin: '10px auto'}}></i>
                    </div>
                    <div className="icon" id="github" title="GitHub" onClick={() => this.github()}>
                        <i className="fas fa-code-branch" style={{width: '25px', height: '25px', color: '#ccc', margin: '10px auto'}}></i>
                    </div>
                    <div className="icon" id="export" title="Export">
                        <i className="fas fa-download" style={{width: '25px', height: '25px', color: '#ccc', margin: '10px auto'}}></i>
                    </div>
                </div>
                <div className="sbar_content">
                    {this.state.isExplorerAppear && <Explorer />}
                    {this.state.isConfigurationAppear && <Configuration />}
                    {this.state.isGithubAppear && <Github />}
                </div>
            </div>
        );
    }
}

export default withRouter(SideBar);