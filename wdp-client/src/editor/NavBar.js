import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './css/navbar.css'

class NavBar extends Component {
    explorer() {
        var x = document.getElementById("eplorer");
        if (x.className === "icon") {
            x.className += " responsive";
            document.getElementById("configuration").className = "icon";
            document.getElementById("github").className = "icon";
            document.getElementById("navbar").className += " responsive";
        }
        else {
            x.className = "icon";
            document.getElementById("navbar").className = "navbar";
        }
    }
    configuration() {
        var x = document.getElementById("configuration");
        if (x.className === "icon") {
            x.className += " responsive";
            document.getElementById("eplorer").className = "icon";
            document.getElementById("github").className = "icon";
            document.getElementById("navbar").className += " responsive";
        }
        else {
            x.className = "icon";
            document.getElementById("navbar").className = "navbar";
        }
    }
    github() {
        var x = document.getElementById("github");
        if (x.className === "icon") {
            x.className += " responsive";
            document.getElementById("eplorer").className = "icon";
            document.getElementById("configuration").className = "icon";
            document.getElementById("navbar").className += " responsive";
        }
        else {
            x.className = "icon";
            document.getElementById("navbar").className = "navbar";
        }
    }
    render() {
        return (
            <div className="navbar" id="navbar">
                <div className="shortcut">
                    <div className="icon" id="eplorer" onClick={() => this.explorer()}>
                        <i className="fas fa-file" id="icon" style={{width: '25px', height: '25px', color: '#ccc', margin: '10px auto'}}></i>
                    </div>
                    <div className="icon" id="configuration" onClick={() => this.configuration()}>
                        <i className="fas fa-cogs" style={{width: '25px', height: '25px', color: '#ccc', margin: '10px auto'}}></i>
                    </div>
                    <div className="icon" id="github" onClick={() => this.github()}>
                        <i className="fas fa-code-branch" style={{width: '25px', height: '25px', color: '#ccc', margin: '10px auto'}}></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(NavBar);