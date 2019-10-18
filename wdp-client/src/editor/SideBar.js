import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import Explorer from './sidebar/explorer'
import './css/sidebar.css'

class SideBar extends Component {
    explorer() {
        let newExplorer = new Explorer();
        newExplorer.render(<Explorer />, document.getElementById("sidebar"));
        var x = document.getElementById("explorer");
        if (x.className === "icon") {
            x.className += " responsive";
            document.getElementById("configuration").className = "icon";
            document.getElementById("github").className = "icon";
            document.getElementById("sidebar").className += " responsive";
        }
        else {
            x.className = "icon";
            document.getElementById("sidebar").className = "sidebar";
        }
    }
    configuration() {
        var x = document.getElementById("configuration");
        if (x.className === "icon") {
            x.className += " responsive";
            document.getElementById("explorer").className = "icon";
            document.getElementById("github").className = "icon";
            document.getElementById("sidebar").className += " responsive";
        }
        else {
            x.className = "icon";
            document.getElementById("sidebar").className = "sidebar";
        }
    }
    github() {
        var x = document.getElementById("github");
        if (x.className === "icon") {
            x.className += " responsive";
            document.getElementById("explorer").className = "icon";
            document.getElementById("configuration").className = "icon";
            document.getElementById("sidebar").className += " responsive";
        }
        else {
            x.className = "icon";
            document.getElementById("sidebar").className = "sidebar";
        }
    }
    render() {
        return (
            <div className="sidebar" id="sidebar">
                <div className="sbar_icons">
                    <div className="icon" id="explorer" onClick={() => this.explorer()}>
                        <i className="fas fa-file" id="icon" style={{width: '25px', height: '25px', color: '#ccc', margin: '10px auto'}}></i>
                    </div>
                    <div className="icon" id="configuration" onClick={() => this.configuration()}>
                        <i className="fas fa-cogs" style={{width: '25px', height: '25px', color: '#ccc', margin: '10px auto'}}></i>
                    </div>
                    <div className="icon" id="github" onClick={() => this.github()}>
                        <i className="fas fa-code-branch" style={{width: '25px', height: '25px', color: '#ccc', margin: '10px auto'}}></i>
                    </div>
                    <div className="icon" id="export">
                        <i className="fas fa-download" style={{width: '25px', height: '25px', color: '#ccc', margin: '10px auto'}}></i>
                    </div>
                </div>
                <div className="sbar_content" id="sbar_content"></div>
            </div>
        );
    }
}

export default withRouter(SideBar);